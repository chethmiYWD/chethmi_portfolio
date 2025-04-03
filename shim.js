export default {
    async fetch(request, env) {
      // For production with ASSETS binding
      if (env.ASSETS) {
        return await env.ASSETS.fetch(request);
      }
      
      // For local development
      try {
        const url = new URL(request.url);
        let pathname = url.pathname === '/' ? '/index.html' : url.pathname;
        
        // Create a mock response for local files
        const file = await fetch(new Request(`https://example.com${pathname}`));
        if (file.status === 404) {
          return new Response('File not found', { status: 404 });
        }
        return file;
      } catch (err) {
        return new Response(`Local dev error: ${err.message}`, { 
          status: 500,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    }
  };