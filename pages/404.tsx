import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NextError from 'next/error';
import { useRouter } from 'next/router';

import Link from '../components/Link';
import styles from './index.module.sass';

export default function ErrorPage() {
  const router = useRouter();
  const requestedCode = Number(router.query.code);
  const code = [403, 404, 500, 503].includes(requestedCode)
    ? requestedCode
    : 404;

  return (
    <div>
      <NextError statusCode={code} />
      <Link
        href="/"
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
      </Link>
    </div>
  );
}
