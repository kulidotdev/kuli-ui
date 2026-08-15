import { getPageImageUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { appName, siteUrl } from '@/lib/shared';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const revalidate = false;

async function getLogoDataUrl() {
  const buffer = await readFile(join(process.cwd(), 'public/logo_192x192.png'));
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const logoSrc = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          backgroundColor: '#09090b',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Logo + site name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={40} height={40} alt="" style={{ borderRadius: '8px' }} />
          <span style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700 }}>
            {appName}
          </span>
        </div>

        {/* Page content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {page.data.description ? (
            <p style={{ color: '#a1a1aa', fontSize: '22px', margin: 0 }}>
              {page.data.description}
            </p>
          ) : null}
          <h1
            style={{
              color: '#ffffff',
              fontSize: '56px',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {page.data.title}
          </h1>
        </div>

        {/* Footer */}
        <p style={{ color: '#52525b', fontSize: '18px', margin: 0 }}>
          {siteUrl}
        </p>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
