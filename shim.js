export default {
    async fetch(request, env) {
      // For production with ASSETS binding
      if (env.ASSETS) {
        return await env.ASSETS.fetch(request);
      }
      
      // For local development
      const url = new URL(request.url);
      let path = url.pathname;
      
      // Default to index.html for root path
      if (path === '/') path = '/index.html';
      
      // Create a simple file server for local development
      try {
        const file = await fetch(`file://${process.cwd()}${path}`);
        return new Response(file.body, {
          status: file.status,
          headers: file.headers
        });
      } catch (err) {
        return new Response('Not Found', { status: 404 });
      }
    }
  };