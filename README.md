# Urban Nexus — Final GitHub Production Package

Production domain: https://urbannexus.ai  
Production email: info@urbannexus.ai

## Required Vercel Environment Variable
WEBHOOK_URL=https://hook.make.com/your-webhook-url

## Routes
- /
- /us-market-entry-validation
- /us-market-entry-system
- /market-validation-us
- /pricing
- /contact
- /thank-you

## Deployment
Upload all files and the api folder to the root of the GitHub repository. Vercel will redeploy automatically.

## Notes
- Use /thank-you as the conversion event URL.
- Submit sitemap.xml to Google Search Console.


## Physical Validation Page
- us-market-entry-validation.html is included to prevent 404 on /us-market-entry-validation even if rewrites fail.
