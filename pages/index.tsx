import classNames from 'classnames';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Meta from '../components/Meta';
import styles from './index.module.sass';

const Home = () => (
  <>
    <Meta
      title="Startseite"
      description="Herzlich willkommen auf unserer Website! Hier finden eine kurze Beschreibung von unseren Arbeiten im Bereich Tadelakt, Lehmputz, sowie Herstellung und Restaurierung alter Wände und Oberflächen. Des weiteren finden Sie hier Bilder von einigen unserer Projekte, welche im Raum Braunau am Inn, Ried im Innkreis bis nach Salzburg durchgeführt wurden."
    />
    <Header>
      <div className={styles.center}>
        <img
          src="/theme/images/header-logo.png"
          alt="I-Ging 64 Symbol"
          style={{ width: '100%' }}
        />
      </div>
    </Header>
    <Layout renderHeader={false}>
      <div
        className={classNames(
          styles.container,
          styles.rowContainer,
          styles.centerChilds,
        )}
      ></div>
      <div className={styles.container}>
        <Link href="/tadelakt">
          <div className={styles.listing}>
            <div className={styles.image}>
              <img src="/images/tadelakt.jpg" alt="Tadelakt" />
            </div>
            <div className={styles.text}>
              <h3>Tadelakt - Kalkputztechnik aus Marokko</h3>
              Diese marokkanische Kalkputztechnik verbindet Ästhetik und
              Wirksamkeit. <p className={styles.more}>Mehr erfahren...</p>
            </div>
          </div>
        </Link>
        <Link href="/lehmputz">
          <div className={styles.listing}>
            <div className={styles.image}>
              <img src="/images/lehmputz.jpg" alt="Lehmputz" />
            </div>
            <div className={styles.text}>
              <h3>
                Lehmputz - Feuchtigkeitsregulierend individuell gesatltbar
              </h3>
              Lehm ist der älteste mineralische Baustoff der Menschheit.{' '}
              <p className={styles.more}>Mehr erfahren...</p>
            </div>
          </div>
        </Link>
        <Link href="/herstellung-und-restaurierung">
          <div className={styles.listing}>
            <div className={styles.image}>
              <img
                src="/images/herstellung-und-restaurierung.jpg"
                alt="Herstellung und Restaurierung"
              />
            </div>
            <div className={styles.text}>
              <h3>
                Herstellung und Restaurierung mineralischer
                Architekturoberflächen
              </h3>
              Natürliche Materialien haben einen Alterswert, den wir sowohl
              schützen als auch ästhetisch hervorheben möchten.{' '}
              <p className={styles.more}>Mehr erfahren...</p>
            </div>
          </div>
        </Link>
      </div>
    </Layout>
  </>
);

export default Home;
