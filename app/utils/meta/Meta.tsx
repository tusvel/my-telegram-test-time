import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

import { ISeo } from '@/utils/meta/meta.interface';
import { onlyText } from '@/utils/string';

import { siteName, titleMerge } from '@/config/seo.config';

const Meta: FC<PropsWithChildren & ISeo> = ({
  children,
  image,
  title,
  description
}) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}`;

  return (
    <>
      <Head>
        <title itemProp="headline">{titleMerge(title)}</title>
        {description ? (
          <>
            <meta
              itemProp="description"
              name="description"
              content={onlyText(description, 152)}
            />
            <link rel="canonical" href={currentUrl} />
            <meta property="og:locale" content="en" />
            <meta property="og:title" content={titleMerge(title)} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image || '/favicon.ico'} />
            <meta property="og:site_name" content={siteName} />
            <meta
              property="og:description"
              content={onlyText(description, 197)}
            />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;
