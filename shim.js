export default {
    async fetch(request, env) {
      // Fallback for local development
      if (!env.ASSETS) {
        return new Response("ASSETS binding not available in local dev", { 
          status: 500,
          headers: { "Content-Type": "text/plain" }
        });
      }
      return await env.ASSETS.fetch(request);
    }
  };