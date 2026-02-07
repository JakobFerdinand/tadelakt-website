import React, { useState } from 'react';

import classNames from 'classnames';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Lightbox from 'react-image-lightbox';

import { fetchLehmputz } from '../lib/api';

import Link from '../components/Link';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

export const getStaticProps = async () => {
  return {
    props: await fetchLehmputz(),
  };
};

const Lehmputz = ({ work }) => {
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
            <h2>Lehmputz</h2>
            <p className={styles.subHeading}>
              Feuchtigkeitsregulierend, individuell gestaltbar
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

export default Lehmputz;
