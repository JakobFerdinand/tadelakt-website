import React, { useState } from 'react';

import classNames from 'classnames';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Lightbox from 'react-image-lightbox';

import { fetchHerstellungUndRestaurierung } from '../lib/api';

import Link from '../components/Link';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

export const getStaticProps = async () => {
  return {
    props: await fetchHerstellungUndRestaurierung(),
  };
};

const HerstellungUndRestaurierung = ({ work }) => {
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
        <Link href="/">
          <a className={styles.more}>
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
          </a>
        </Link>
        <div className={classNames(styles.container, styles.centerChilds)}>
          <div className={classNames(styles.twoThird, styles.left)}>
            <h2>Herstellung und Restaurierung</h2>
            <p className={styles.subHeading}>
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

export default HerstellungUndRestaurierung;
