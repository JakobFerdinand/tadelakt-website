import React from 'react';

import FooterLogo from '../FooterLogo';
import FooterNavigation from '../FooterNavigation';

import styles from './Footer.module.sass';

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.footerLogo}>
        <FooterLogo />
      </div>
      <div className={styles.footerNavigation}>
        <FooterNavigation />
      </div>
    </div>
  </div>
);

export default Footer;
