export default {
    async fetch(request, env) {
      // For local development without ASSETS binding
      if (typeof env.ASSETS === 'undefined') {
        const url = new URL(request.url);
        if (url.pathname === '/') url.pathname = '/index.html';
        
        try {
          const file = await fetch('file://' + __dirname + url.pathname);
          if (file.status === 404) {
            return new Response('File not found', { status: 404 });
          }
          return file;
        } catch (err) {
          return new Response(`Error: ${err.message}`, { status: 500 });
        }
      }
      
      // For production with ASSETS binding
      return await env.ASSETS.fetch(request);
    }
  };