import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Link from '../Link';

import styles from './MainNavigation.module.sass';

const MainNavigation = ({ lightColors = false }) => {
  useEffect(() => {
    const menuBtn = document.getElementsByClassName(styles.menuToggle)[0];
    const nav = document.getElementsByClassName(styles.mainNavigation)[0];

    menuBtn.addEventListener(
      'click',
      () => {
        nav.classList.toggle(styles.open);
      },
      false
    );

    return () => {};
  }, []);

  return (
    <div
      className={classNames(
        styles.mainNavigation,
        lightColors ? styles.lightColors : null
      )}
    >
      <div className={styles.menuToggle}></div>
      <nav className={styles.nav}>
        <Link
          href="/"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          <a>Startseite</a>
        </Link>
        <Link
          href="/arbeit"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          <a>Arbeit</a>
        </Link>
        <Link
          href="/ueber-uns"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          <a>Über uns</a>
        </Link>
        <Link
          href="/kontakt"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          <a>Kontakt</a>
        </Link>
      </nav>
    </div>
  );
};

MainNavigation.propTypes = {
  lightColors: PropTypes.bool,
};

export default MainNavigation;
