import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useState } from 'react';
import GalleryLightbox from '../components/GalleryLightbox';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Meta from '../components/Meta';
import { type GalleryImage, getGalleryImages } from '../lib/gallery';
import styles from './index.module.sass';

export async function getStaticProps() {
  const images = getGalleryImages('tadelakt');

  return {
    props: {
      images,
    },
  };
}

const Tadelakt = ({ images }: { images: GalleryImage[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      <Meta
        title="Tadelakt"
        description="Diese marokkanische Kalkputztechnik verbindet Ästhetik und Wirksamkeit. Aus leicht hydraulischem Kalkmörtel hergestellt und mit allen kalkechten Pigmenten färbbar, lassen sich Räume mit Tadelakt fugenlos und monolithisch gestalten."
      />
      <Layout
        title="Tadelakt"
        headerBackground={`#365678 url("/theme/images/alternative-header-background.png")`}
      >
        <Link href="/" className={styles.more}>
          <p>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{
                verticalAlign: 'sub',
                width: 20,
                height: 20,
                marginTop: 15,
              }}
            />{' '}
            Zurück
          </p>
        </Link>
        <div className={classNames(styles.container, styles.centerChilds)}>
          <div className={classNames(styles.twoThird, styles.left)}>
            <h2>Tadelakt</h2>
            <p className={styles.subText}>Kalkputztechnik aus Marokko</p>
            <p>
              Diese marokkanische Kalkputztechnik verbindet Ästhetik und
              Wirksamkeit. Aus leicht hydraulischem Kalkmörtel hergestellt und
              mit allen kalkechten Pigmenten färbbar, lassen sich Räume mit
              Tadelakt fugenlos und monolithisch gestalten.
            </p>
            <p>
              Mehrere Glätt- und Verdichtungsvorgänge sowie eine abschließende
              Verseifung des Putzes schaffen eine fühlbar glatte, seidig
              glänzende Oberfläche.
            </p>
            <p>
              Aufgrund seiner hydrophoben Eigenschaften und seiner besonderen
              Haptik empfehlen wir Tadelekt für die Gestaltung des
              Sanitärberechs oder zur Beschichtung von Öfen und Heizwänden.
            </p>
          </div>
        </div>
        {isOpen && (
          <GalleryLightbox
            images={images}
            index={photoIndex}
            close={() => setIsOpen(false)}
          />
        )}
        <br />
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: 50,
            overflow: 'auto',
          }}
        >
          {images.map((item, i) => (
            <div key={item.src} className={styles.gridItem}>
              <button
                type="button"
                className={styles.gridButton}
                aria-label={`${item.title} vergrößern`}
                onClick={() => {
                  setPhotoIndex(i);
                  setIsOpen(true);
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.gridImage}
                />
              </button>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Tadelakt;
