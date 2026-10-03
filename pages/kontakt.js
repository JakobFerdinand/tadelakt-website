import React from 'react';

import {
  faPhoneSquareAlt,
  faEnvelopeSquare,
} from '@fortawesome/free-solid-svg-icons';
import {
  faWhatsappSquare,
  faFacebookSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

const Contact = () => (
  <>
    <Meta
      title="Kontakt"
      description="Hier finden Sie unsere Kontaktdaten für weitere Informationen und Anfragen zu Projekten rund um Tadelakt, Lehmputz und Herstellung und Restaurierung von alten Oberflächen und Gegenständen. Gerne wickeln wir Projekte im Raum Braunau am Inn, Ried im Innkreis bis nach Salzburg ab. Sie erreichen uns unter der angegebenen Telefonnummer."
    />
    <Layout
      title="Kontakt"
      headerBackground={`#7b2614 url("/theme/images/alternative-header-background.png")`}
    >
      <div
        className={classNames(
          styles.container,
          styles.rowContainer,
          styles.centerChilds
        )}
      >
        <div
          className={classNames(
            styles.oneHalf,
            styles.left,
            styles.smallImage,
            styles.extraSmallImage,
            styles.marginBottom,
            styles.mobileMarginTop
          )}
        >
          <img src="/images/arbeit.png" />
          <h2>Anfragen</h2>
          <p className={styles.subText}>Jederzeit erreichbar</p>
        </div>
        <div
          className={classNames(styles.icons, styles.twoThird, styles.right)}
        >
          <p className={styles.iconText}>
            <a href="tel:+436766258629">
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faPhoneSquareAlt} />
              </span>
              <span>+43 676 625 86 29</span>
            </a>
          </p>
          <p className={styles.iconText}>
            <a href="mailto:manfred.wegenschimmel@gmail.com">
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faEnvelopeSquare} />
              </span>
              <span>manfred.wegenschimmel@gmail.com</span>
            </a>
          </p>
          <p className={styles.iconText}>
            <a href="https://wa.me/436766258629">
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faWhatsappSquare} />
              </span>
              <span>+43 676 625 86 29 (externer Link)</span>
            </a>
          </p>
          <p className={styles.iconText}>
            <a href="https://www.facebook.com/mwegenschimmel">
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faFacebookSquare} />
              </span>
              <span>@mwegenschimmel (externer Link)</span>
            </a>
          </p>
          <p className={styles.iconText}>
            <a href="https://www.instagram.com/manfred_wegenschimmel">
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faInstagramSquare} />
              </span>
              <span>@manfred_wegenschimmel (externer Link)</span>
            </a>
          </p>
        </div>
      </div>
    </Layout>
  </>
);

export default Contact;
