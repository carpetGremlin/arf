# Deployment Guide for ARI

This guide will walk you through deploying the ARI (Artificial Retard Intelligence) application on Render.

## Prerequisites

1. [Render](https://render.com) account
2. API keys for required services:
   - Privy for authentication
   - OpenAI or Anthropic for AI models
   - Helius for Solana transactions
   - Other optional services depending on your needs

## Deployment Steps

### 1. Fork/Clone the Repository

Ensure you have the latest version of the codebase on your machine or connect your GitHub repository to Render.

### 2. Set Up Environment Variables

All sensitive keys and configurations are managed through environment variables. These should **never** be committed to the repository.

Required environment variables:
- Authentication: `PRIVY_APP_SECRET`, `PRIVY_SIGNING_KEY`, `WALLET_ENCRYPTION_KEY`
- AI Models: `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- Solana Integration: `HELIUS_API_KEY`
- Public Keys: `NEXT_PUBLIC_PRIVY_APP_ID`, `NEXT_PUBLIC_HELIUS_RPC_URL`, etc.

### 3. Deploy via Render Blueprint

This repository includes a `render.yaml` file that defines the infrastructure needed to run ARI.

1. Log in to your Render account
2. Go to "Blueprints" in the dashboard
3. Click "New Blueprint Instance"
4. Connect to your repository
5. Render will automatically detect the `render.yaml` file
6. Review the configuration and click "Apply"
7. Render will create a web service and PostgreSQL database

### 4. Configure Environment Variables in Render

After creating the services, you'll need to set up the environment variables:

1. Go to the web service in your Render dashboard
2. Navigate to the "Environment" tab
3. Add all the required environment variables
4. For sensitive data like API keys, make sure "Sync" is set to "No"

### 5. Deploy Database

The PostgreSQL database specified in the blueprint will be automatically created by Render.

1. Render will provide the connection strings as environment variables
2. The first deployment will run the Prisma migrations and generate the database schema

### 6. Verify Deployment

1. Once deployment is complete, click on the service URL to access your application
2. Verify that you can log in using Privy authentication
3. Test the core functionality of the application

## Security Considerations

### API Keys and Secrets

- **Never** commit API keys, private keys, or secrets to your repository
- Use Render's environment variables for all sensitive information
- For maximum security, rotate keys periodically

### Database Security

- Render's managed PostgreSQL databases are secured by default
- Access is limited to your Render services using automatically generated credentials
- Data is encrypted at rest and in transit

### User Authentication

- ARI uses Privy for secure authentication
- Ensure your Privy configuration is set up correctly
- Test login flows thoroughly after deployment

## Troubleshooting

### Deployment Failures

- Check the deployment logs in Render dashboard
- Verify all required environment variables are set
- Ensure the database connection is properly configured

### Database Issues

- Check that the Prisma schema is properly migrated
- Verify the `DATABASE_URL` and `DIRECT_URL` environment variables are correctly set
- If needed, you can connect to the database directly using Render's shell access

### Authentication Problems

- Verify your Privy API keys and configuration
- Check for any CORS issues if authentication redirects fail
- Ensure the Privy app ID is correctly set in the frontend

## Production Optimizations

1. **Scaling**: Upgrade your Render plan as needed for increased traffic
2. **Caching**: Consider implementing Redis for session caching and rate limiting
3. **Monitoring**: Set up Render's built-in monitoring and alerts
4. **CDN**: Enable Render's global CDN for improved performance

## Maintenance

1. Keep dependencies updated using `pnpm update`
2. Monitor error logs regularly
3. Set up automated backups for your database
4. Stay updated with security patches for all services 