import React, { useState } from 'react';

import classNames from 'classnames';

import Lightbox from 'react-image-lightbox';

import { fetchWork } from '../lib/api';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

export const getStaticProps = async () => {
  return {
    props: await fetchWork(),
  };
};

const Arbeit = ({ work }) => {
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
            <p>Die Bilder können per Klick vergrößert werden.</p>
          </div>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={work[photoIndex].imageUrl}
            nextSrc={work[(photoIndex + 1) % work.length].imageUrl}
            prevSrc={
              work[(photoIndex + work.length - 1) % work.length].imageUrl
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + work.length - 1) % work.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % work.length)
            }
            imageTitle={work[photoIndex].title}
            imageCaption={work[photoIndex].description}
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
          {work.map((item, i) => (
            <div key={i} className={styles.gridItem}>
              <a
                onClick={() => {
                  setPhotoIndex(i);
                  setIsOpen(true);
                }}
              >
                <img
                  src={item.thumbnailUrl}
                  className={styles.gridImage}
                  alt={item.title}
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
