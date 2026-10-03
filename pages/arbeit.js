import React, { useState } from 'react';

import classNames from 'classnames';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Lightbox from 'react-image-lightbox';

import Link from '../components/Link';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

import path from 'path';
import fs from 'fs';

export async function getStaticProps() {
  const directory = path.join(process.cwd(), 'public', 'images', 'arbeit');
  const filenames = fs.readdirSync(directory);
  const imageFileNames = filenames.filter((filename) =>
    filename.match(/\.(jpe?g|jpg|png|gif|svg)$/i)
  );

  const images = imageFileNames.map((filename) => ({
    src: `/images/arbeit/${filename}`,
    title: filename.split('---')[0],
    // description: `Beschreibung ${i} mit sehr langer beschreibung und noch mehr`,
  }));

  return {
    props: {
      images,
    },
  };
}

const Arbeit = ({ images }) => {
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
          <Lightbox
            mainSrc={images[photoIndex].src}
            nextSrc={images[(photoIndex + 1) % images.length].src}
            prevSrc={
              images[(photoIndex + images.length - 1) % images.length].src
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
            imageTitle={images[photoIndex].title}
            imageCaption={images[photoIndex].description}
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
            <div key={i} className={styles.gridItem}>
              <a
                onClick={() => {
                  setPhotoIndex(i);
                  setIsOpen(true);
                }}
              >
                <img
                  src={require(`../public${item.src}?resize&size=200`)}
                  className={styles.gridImage}
                />
              </a>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Arbeit;
