import React from 'react';
import PropTypes from 'prop-types';

import { NextSeo, SocialProfileJsonLd } from 'next-seo';

const Meta = ({ title, description }) => (
  <>
    <SocialProfileJsonLd
      type="Organization"
      name="mao | mineralische architektur oberflächen"
      url="https://www.tadelakt.at"
    />
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'de_AT',
        url: 'https://www.tadelakt.at',
        site_name: 'mao | mineralische architektur oberflächen',
        title: title,
        titleTemplate: '%s | mao',
        description: description,
        images: [
          {
            url: 'https://www.tadelakt.at/media/images/website_image.jpg',
            alt: 'Logo mao',
          },
        ],
      }}
    />
  </>
);

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Meta;
