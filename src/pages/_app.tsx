import { useEffect } from 'react';
import '@/styles/globals.css';
import Layout from './../../layout/layout';

export default function App({ Component, pageProps }: { Component: React.ComponentType, pageProps: Record<string, unknown> }) {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
