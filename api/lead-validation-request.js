export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const webhookUrl = process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    return res.status(500).json({ ok: false, error: "WEBHOOK_URL is not configured" });
  }

  try {
    const payload = typeof req.body === "object" && req.body !== null ? req.body : JSON.parse(req.body || "{}");

    const requiredFields = ["name", "email", "company", "stage", "message"];
    const missingFields = requiredFields.filter((field) => !payload[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields",
        missingFields
      });
    }

    const enrichedPayload = {
      ...payload,
      submittedAt: new Date().toISOString(),
      userAgent: req.headers["user-agent"] || "",
      ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || ""
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrichedPayload)
    });

    if (!webhookResponse.ok) {
      return res.status(502).json({
        ok: false,
        error: "Webhook request failed"
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Submission could not be processed"
    });
  }
}
