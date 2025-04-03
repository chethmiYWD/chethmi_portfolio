// shim.js
var shim_default = {
  async fetch(request, env) {
    return await env.ASSETS.fetch(request);
  }
};
export {
  shim_default as default
};
//# sourceMappingURL=shim.js.map
