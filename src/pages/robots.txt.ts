// src/pages/robots.txt.ts
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://skyscape-cr.com/sitemap.xml

# Disallow admin or private areas (if any)
Disallow: /admin/
Disallow: /private/

# Allow important resources
Allow: /src/assets/
Allow: /*.css
Allow: /*.js

# Crawl delay (optional, be respectful)
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
