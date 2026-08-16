import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/geist-mono';
import './global.css';
import { siteUrl } from '@/lib/shared';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/logo_16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo_32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/logo_192x192.png', sizes: '192x192', type: 'image/png' },
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
