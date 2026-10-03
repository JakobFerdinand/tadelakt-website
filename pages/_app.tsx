import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'yet-another-react-lightbox/styles.css';
import '../styles/fonts.scss';
import '../styles/globals.sass';

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
