export default {
    async fetch(request, env) {
      // Handle OPTIONS requests for CORS preflight
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400",
          },
        });
      }
  
      // Get the request URL
      const url = new URL(request.url);
      let pathname = url.pathname;
  
      // Default to index.html for root path
      if (pathname === "/") pathname = "/index.html";
  
      try {
        // Try to fetch the asset
        const response = await env.ASSETS.fetch(
          new Request(url.toString(), request)
        );
  
        // Add CORS headers to all responses
        const headers = new Headers(response.headers);
        headers.set("Access-Control-Allow-Origin", "*");
  
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      } catch (err) {
        // Return a 404 response if the asset is not found
        return new Response("Not Found", { 
          status: 404,
          headers: { "Content-Type": "text/plain" }
        });
      }
    }
  };