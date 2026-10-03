import Head from 'next/head';
import { OrganizationJsonLd } from 'next-seo';
import { generateNextSeo } from 'next-seo/pages';

const Meta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <>
    <OrganizationJsonLd
      type="Organization"
      name="mao | mineralische architektur oberflächen"
      url="https://www.tadelakt.at"
    />
    <Head>
      {generateNextSeo({
        title,
        description,
        openGraph: {
          type: 'website',
          locale: 'de_AT',
          url: 'https://www.tadelakt.at',
          siteName: 'mao | mineralische architektur oberflächen',
          title: title,
          description: description,
          images: [
            {
              url: 'https://www.tadelakt.at/media/images/website_image.jpg',
              alt: 'Logo mao',
            },
          ],
        },
      })}
    </Head>
  </>
);

export default Meta;
