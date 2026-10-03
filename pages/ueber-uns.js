import React from 'react';

import classNames from 'classnames';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

const AboutUs = () => (
  <>
    <Meta
      title="Über uns"
      description="Unser Team besteht aus Manfred Wegenschimmel und Reinhold Bartosch. Auch wenn jeder von uns schon viele Projekte alleine umgesetzt hat, so arbeiten wir doch immer wieder zusammen und ergänzen uns gegenseitig."
    />
    <Layout
      title="Über uns"
      headerBackground={`#7b2614 url("/theme/images/alternative-header-background.png")`}
    >
      <div className={styles.twoGrid}>
        <div className={classNames(styles.container, styles.centerChilds)}>
          <div className={classNames(styles.smallImage)}>
            <img src="/images/manfred.jpg" />
          </div>
          <div className={classNames(styles.twoThird, styles.right)}>
            <h2>Manfred Wegenschimmel</h2>
            <p className={styles.subText}>Florianigasse 5 · A-4943 Geinberg</p>
            <p className={styles.subText}>+43 676 625 86 29</p>
            <p className={styles.subText}>m.wegenschimmel@gmail.com</p>
          </div>
        </div>
        <div className={classNames(styles.container, styles.centerChilds)}>
          <div className={classNames(styles.smallImage)}>
            <img src="/images/reinhold.jpg" />
          </div>
          <div className={classNames(styles.twoThird, styles.left)}>
            <h2>Reinhold Bartosch</h2>
            <p className={styles.subText}>Auerbach 18 · A-5224 Auerbach</p>
            <p className={styles.subText}>+43 664 956 99 1 1</p>
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
    </Layout>
  </>
);

export default AboutUs;
