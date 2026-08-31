export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = `https://rpg-monica-sims-girlfriend.trycloudflare.com${url.pathname}${url.search}`;
  
  const headers = new Headers(req.headers);
  headers.set('host', 'rpg-monica-sims-girlfriend.trycloudflare.com');
  headers.set('x-forwarded-host', url.host);
  headers.set('x-forwarded-proto', 'https');

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
      redirect: 'manual'
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('access-control-allow-origin', '*');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } catch (error) {
    return new Response(`Proxy Error: ${error.message}`, { status: 502 });
  }
}
