interface Env {
  ASSETS: {
    fetch: (req: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Redirect if the path starts with /r/ and DOES NOT have a .json suffix
    if (url.pathname.startsWith('/r/') && !url.pathname.endsWith('.json')) {
      url.pathname = `${url.pathname}.json`;
      return Response.redirect(url.toString(), 302);
    }

    // If it doesn't match the condition above (including .json requests),
    // serve the static file from the [assets] directory
    return env.ASSETS.fetch(request);
  }
};
