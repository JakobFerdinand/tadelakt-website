import { useRouter } from 'next/router';

import Error from 'next/error';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Link from '../components/Link';
import styles from './index.module.sass';

export default function ErrorPage() {
  const router = useRouter();
  const code = router.query.code || 500;

  return (
    <div>
      <Error statusCode={code} />
      <Link href="/">
        <a
          style={{
            position: 'absolute',
            top: '50%',
            textAlign: 'center',
            display: 'block',
            width: '100%',
            paddingTop: 50,
          }}
          className={styles.more}
        >
          <p>
            Zur Startseite
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{
                marginLeft: 5,
                width: 15,
                height: 15,
                marginTop: 15,
              }}
            />
          </p>
        </a>
      </Link>
    </div>
  );
}
