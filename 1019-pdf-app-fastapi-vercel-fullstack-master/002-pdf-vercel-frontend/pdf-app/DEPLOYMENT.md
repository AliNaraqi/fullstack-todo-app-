# Frontend Deployment Configuration Guide

## Environment Variables Setup

### For Vercel Deployment:

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables
2. **Add/Update these variables:**

```
NEXT_PUBLIC_API_URL=https://your-service-name.onrender.com
NODE_ENV=production
```

### For Netlify Deployment:

1. **Go to Netlify Dashboard** → Site Settings → Environment Variables
2. **Add the same variables as above**

### For Local Development:

Create `.env.local` file in the frontend root:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NODE_ENV=development
```

## Testing Production Connection

1. **Deploy your frontend** with the production API URL
2. **Open the deployed frontend**
3. **Look for connection status**:
   - ✅ "Connected to server" = Success
   - ⚠️ "Working offline" = API connection failed
4. **Test CRUD operations**:
   - Create a todo
   - Edit a todo
   - Delete a todo
   - Refresh page (should persist data)

## Troubleshooting

- **CORS Issues**: Ensure your FastAPI backend has CORS configured for your frontend domain
- **API URL**: Double-check the Render service URL is correct
- **Environment Variables**: Verify variables are set correctly in your hosting platform
- **Build Process**: Ensure environment variables are available during build time
