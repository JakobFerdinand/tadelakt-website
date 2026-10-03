import React from 'react';

import classNames from 'classnames';

import Meta from '../components/Meta';
import Layout from '../components/Layout';

import styles from './index.module.sass';

const Imprint = () => (
  <>
    <Meta
      title="Impressum"
      description="Rechtliche Informationen wem diese Website gehört und wer zuständig ist für Informationen und Auskünfte."
    />
    <Layout
      title="Impressum"
      headerBackground={`#7b2614 url("/theme/images/alternative-header-background.png")`}
    >
      <div className={classNames(styles.container)}>
        <p className={styles.h2downText}>Name:</p>
        <p>Manfred Wegenschimmel</p>
        <p className={styles.h2downText}>Unternehmensgegenstand:</p>
        <p>Freiberuflicher Restaurator und Künstler</p>
        <p className={styles.h2downText}>Tätigkeiten: </p>
        <p>
          Restaurierungen und historisch mineralische Architekturoberflächen,
          künstlerische und freischaffende Tätigkeiten
        </p>
        <p className={styles.h2downText}>Adresse: </p>
        <p>Florianigasse 5</p>
        <p>4943 Geinberg</p>
      </div>
    </Layout>
  </>
);

export default Imprint;
