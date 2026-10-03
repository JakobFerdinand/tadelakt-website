import classNames from 'classnames';
import { Children, type ReactNode } from 'react';

import Logo from '../Logo';
import MainNavigation from '../MainNavigation';

import styles from './Header.module.sass';

const Header = ({
  background = null,
  title = null,
  children,
}: {
  background?: string | null;
  title?: string | null;
  children?: ReactNode;
}) => (
  <>
    <div
      className={classNames(
        styles.header,
        Children.count(children) > 0 ? styles.banner : null,
      )}
      style={
        Children.count(children) > 0 && background
          ? { backgroundImage: background }
          : {}
      }
    >
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Logo simple={Children.count(children) > 0} />
        </div>
        <div className={styles.menu}>
          <MainNavigation lightColors={Children.count(children) > 0} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
    {Children.count(children) === 0 && (
      <div
        className={styles.titleBar}
        style={background ? { background: background } : {}}
      >
        <div className={styles.inner}>
          <span>{title}</span>
        </div>
      </div>
    )}
  </>
);

export default Header;
