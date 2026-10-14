import Head from 'next/head';
import styles from './tage-des-offenen-ateliers.module.sass';

const title = 'Tage des offenen Ateliers | Atelier Manfred Wegenschimmel';
const description =
  'Atelier Manfred Wegenschimmel: Tage des offenen Ateliers am 17. und 18. Oktober 2026, 10:00–12:00 und 14:00–18:00 Uhr. Kirchenplatz 5, 4943 Geinberg. Eintritt frei.';
const url = 'https://www.tadelakt.at/tage-des-offenen-ateliers/';

function AtelierName() {
  return <p className={styles.atelier}>Atelier Manfred Wegenschimmel</p>;
}

function ContactDetails() {
  return (
    <div className={styles.details}>
      <div className={styles.contact}>
        <a href="tel:+436766258629">+43 676 6258629</a>
        <a href="mailto:m.wegenschimmel@gmail.com">M.WEGENSCHIMMEL@GMAIL.COM</a>
      </div>
      <div className={styles.venue}>
        <address>KIRCHENPLATZ 5 | 4943 GEINBERG</address>
        <p>EINTRITT FREI</p>
      </div>
    </div>
  );
}

export default function TageDesOffenenAteliers() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#180d45" />
        <link rel="canonical" href={url} />
        <link rel="icon" href="/theme/favicons/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_AT" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta
          property="og:image"
          content="https://www.tadelakt.at/tdoa/atelier-31-1800.webp"
        />
        <meta property="og:image:alt" content="Reliefplatten im Atelier" />
        <link
          rel="preload"
          href="/tdoa/fonts/Saans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/tdoa/fonts/SaansMono-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <main id="main" lang="de" className={styles.page}>
        <section className={styles.section} aria-labelledby="atelier-event">
          <AtelierName />
          <div className={styles.event}>
            <h1 id="atelier-event" className={styles.title}>
              <span>Tage des</span> <span>offenen</span> <span>Ateliers</span>
            </h1>
            <div className={styles.schedule}>
              <p>
                Samstag <time dateTime="2026-10-17">17.</time>
                <br />
                &amp; Sonntag <time dateTime="2026-10-18">18.10.2026</time>
              </p>
              <p>
                10:00 - 12:00 Uhr
                <br />
                14:00 - 18:00 Uhr
              </p>
            </div>
          </div>
          <ContactDetails />
        </section>
        {[
          { number: 31, label: 'Rechteckige Reliefplatten im Atelier' },
          { number: 24, label: 'Drei kreisförmige Reliefs im Atelier' },
        ].map(({ number, label }) => (
          <section
            key={number}
            aria-label={label}
            className={`${styles.section} ${styles.photograph}`}
          >
            <img
              className={styles.background}
              src={`/tdoa/atelier-${number}-1800.webp`}
              srcSet={[900, 1800, 3000]
                .map(
                  (width) => `/tdoa/atelier-${number}-${width}.webp ${width}w`,
                )
                .join(', ')}
              sizes="(max-aspect-ratio: 2/3) 67vh, 100vw"
              width={1800}
              height={2699}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <AtelierName />
            <ContactDetails />
          </section>
        ))}
      </main>
    </>
  );
}
