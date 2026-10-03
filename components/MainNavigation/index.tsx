import classNames from 'classnames';
import { useState } from 'react';

import Link from '../Link';

import styles from './MainNavigation.module.sass';

const MainNavigation = ({ lightColors = false }: { lightColors?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames(
        styles.mainNavigation,
        lightColors ? styles.lightColors : null,
        isOpen ? styles.open : null,
      )}
    >
      <button
        type="button"
        className={styles.menuToggle}
        aria-label="Menü"
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        onClick={() => setIsOpen(!isOpen)}
      />
      <nav id="main-navigation" className={styles.nav}>
        <Link
          href="/"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          Startseite
        </Link>
        <Link
          href="/arbeit"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          Arbeit
        </Link>
        <Link
          href="/ueber-uns"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          Über uns
        </Link>
        <Link
          href="/kontakt"
          defaultClass={styles.navItem}
          activeClass={styles.active}
        >
          Kontakt
        </Link>
      </nav>
    </div>
  );
};

export default MainNavigation;
