import type {LoaderFunctionArgs} from '@shopify/remix-oxygen';

export async function loader({request}: LoaderFunctionArgs) {
  const sitemap = generateSitemap({baseUrl: new URL(request.url).origin});

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',

      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}

function generateSitemap({baseUrl}: {baseUrl: string}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
    <loc>${baseUrl}//sitemap-collections.xml</loc>
    <lastmod>2024-07-14T07:32:56+00:00</lastmod>
    </sitemap>
    <sitemap>
    <loc>${baseUrl}//sitemap-products.xml</loc>
    <lastmod>2024-07-14T07:32:56+00:00</lastmod>
    </sitemap>
    <sitemap>
    <loc>${baseUrl}//sitemap-pages.xml</loc>
    <lastmod>2024-07-14T07:32:56+00:00</lastmod>
    </sitemap>
    </sitemapindex>
  `;
}
