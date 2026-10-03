import Link from '../Link';

import styles from './FooterLogo.module.sass';

const FooterLogo = () => (
  <div className={styles.footerLogo}>
    <Link href="/">
      <img
        src="/theme/images/footer-logo.png"
        alt="mao – Startseite"
        style={{ width: '100%' }}
      />
    </Link>
  </div>
);

export default FooterLogo;
