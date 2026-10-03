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
  const images = getGalleryImages('lehmputz');

  return {
    props: {
      images,
    },
  };
}

const Lehmputz = ({ images }: { images: GalleryImage[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      <Meta
        title="Lehmputz"
        description="Lehm ist der älteste mineralische Baustoff der Menschheit. Feuchtigkeitsregulierend und atmungsaktiv, mit geringem Energieaufwand herstellbar. Diese ökologischen und bauphysikalischen Vorzüge von Lehmputzen verbinden sich mit vielfältigen Bearbeitungsmöglichkeiten."
      />
      <Layout
        title="Lehmputz"
        headerBackground={`#8e6031 url("/theme/images/alternative-header-background.png")`}
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
            <h2>Lehmputz</h2>
            <p className={styles.subText}>
              Feuchtigkeitsregulierend individuell gestaltbar
            </p>
            <p>
              Lehm ist der älteste mineralische Baustoff der Menschheit.
              Feuchtigkeitsregulierend und atmungsaktiv, mit geringem
              Energieaufwand herstellbar. Diese ökologischen und
              bauphysikalischen Vorzüge von Lehmputzen verbinden sich mit
              vielfältigen Bearbeitungsmöglichkeiten.
            </p>
            <p>
              Ein Material, das uns zu kreativer Gestaltung und origineller
              Verwendung inspiriert. Neue und individuelle Lehmoberflächen
              gemeinsam mit ArchitektInnen und AuftraggeberInnen zu entwickeln
              ist uns ein entsprechendes Anliegen.
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

export default Lehmputz;
