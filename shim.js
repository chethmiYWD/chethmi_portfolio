export default {
    async fetch(request, env) {
      // Get request URL and normalize path
      const url = new URL(request.url);
      let pathname = url.pathname;
      
      // Handle root path and directory indexes
      if (pathname.endsWith('/')) pathname += 'index.html';
      if (pathname === '/') pathname = '/index.html';
      
      // Remove leading slash
      const assetPath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
      
      // Create new request for the asset
      const assetUrl = new URL(pathname, url.origin);
      const assetRequest = new Request(assetUrl.toString(), request);
      
      try {
        // Fetch from ASSETS
        const response = await env.ASSETS.fetch(assetRequest);
        
        // Clone response to modify headers
        const headers = new Headers(response.headers);
        headers.set('Access-Control-Allow-Origin', '*');
        
        return new Response(response.body, {
          status: response.status,
          headers: headers
        });
      } catch (err) {
        // Enhanced error response
        return new Response(`
          <h1>404 Not Found</h1>
          <h3>Debug Information:</h3>
          <p>Request Path: ${pathname}</p>
          <p>Asset Path: ${assetPath}</p>
          <p>Error: ${err.message}</p>
          <h3>Available Files:</h3>
          <ul>
            <li>index.html (uploaded as index.8820db139c.html)</li>
            <li>styles.css</li>
            <li>script.js</li>
            <li>assets/Image.jpg</li>
          </ul>
        `, {
          status: 404,
          headers: {'Content-Type': 'text/html'}
        });
      }
    }
  }