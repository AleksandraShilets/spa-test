// src/pages/_app.tsx
// import '@/styles/input.css';
import '../styles/output.css';

// import '../../../spa-test/output.css';


import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
