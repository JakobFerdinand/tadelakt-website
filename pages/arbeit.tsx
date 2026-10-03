import classNames from 'classnames';
import { useState } from 'react';
import GalleryLightbox from '../components/GalleryLightbox';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import { type GalleryImage, getGalleryImages } from '../lib/gallery';
import styles from './index.module.sass';

export async function getStaticProps() {
  const images = getGalleryImages('arbeit');

  return {
    props: {
      images,
    },
  };
}

const Arbeit = ({ images }: { images: GalleryImage[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      <Meta
        title="Arbeit"
        description="Eine kleiner Ausschnitt unserer Projekte und Arbeiten. Von Oberflächenverputz in Bädern bis zur Verziehrung von Gegenständen und andere Kunstwerke finden Sie einen groben Überblick."
      />
      <Layout
        title="Arbeit und Projekte"
        headerBackground={`#7b2614 url("/theme/images/alternative-header-background.png")`}
      >
        <div className={classNames(styles.container, styles.centerChilds)}>
          <div className={classNames(styles.twoThird, styles.left)}>
            <h2>Ein Ausschnitt</h2>
            <p>
              Die Bilder sind nach Name geordnet und können per Klick vergrößert
              werden.
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

export default Arbeit;
