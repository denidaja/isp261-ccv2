import { PageMetaConfig } from '@spartacus/core';

export const customMetaResolverConfig: PageMetaConfig = {
  pageMeta: {
    resolvers: [
      {
        property: 'keywords',
        method: 'resolveKeywords',
      },
      {
        property: 'title',
        method: 'resolveTitle',
      },
      {
        property: 'heading',
        method: 'resolveHeading',
      },
      {
        property: 'breadcrumbs',
        method: 'resolveBreadcrumbs',
      },
      {
        property: 'description',
        method: 'resolveDescription',
        disabledInCsr: false,
      },
      {
        property: 'image',
        method: 'resolveImage',
        disabledInCsr: false,
      },
      {
        property: 'robots',
        method: 'resolveRobots',
        disabledInCsr: false,
      },
      {
        property: 'canonicalUrl',
        method: 'resolveCanonicalUrl',
        disabledInCsr: true,
      },
    ],
    canonicalUrl: {
      forceHttps: true,
      forceWww: false,
      removeQueryParams: true,
      forceTrailingSlash: true,
    },
  },
};
