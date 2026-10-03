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
  const images = getGalleryImages('herstellung-und-restaurierung');

  return {
    props: {
      images,
    },
  };
}

const HerstellungUndRestaurierung = ({
  images,
}: {
  images: GalleryImage[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      <Meta
        title="Herstellung und Restaurierung"
        description="Natürliche Materialien haben einen Alterswert, den wir sowohl schützen als auch ästhetisch hervorheben möchten. Die Restaurierung und Konservierung mineralischer Architekturoberflächen führen wir mit Respekt vor der Schönheit des Materials und im Wissen um die historischen Techniken ihrer Herstellung aus."
      />
      <Layout
        title="Herstellung und Restaurierung"
        headerBackground={`#7d8387 url("/theme/images/alternative-header-background.png")`}
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
            <h2>Herstellung und Restaurierung</h2>
            <p className={styles.subText}>
              mineralischer Architekturoberflächen
            </p>
            <p>
              Natürliche Materialien haben einen Alterswert, den wir sowohl
              schützen als auch ästhetisch hervorheben möchten. Die
              Restaurierung und Konservierung mineralischer
              Architekturoberflächen führen wir mit Respekt vor der Schönheit
              des Materials und im Wissen um die historischen Techniken ihrer
              Herstellung aus.
            </p>
            <p>
              Mit Methoden der Steinrestaurierung lassen sich fehlerhafte
              Sichtbetonoberflächen entscheidend verbessern (Schalungsfehler,
              Lufteinschlüsse etc.).
            </p>
            <p>
              Für den Innenberech bieten wir die Umstellung von Dispersions-
              oder Sikikatoberflächen auf Kalksysteme ohne Acrylate an.
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

export default HerstellungUndRestaurierung;
