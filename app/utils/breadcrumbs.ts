import { z } from 'zod';

type Breadcrumb = {
  name: string;
  href: string;
};


export const breadcrumbTypeSchema = z.enum([
  'collections',
  'collection',
  'product',
]);
export type TBreadcrumbType = z.infer<typeof breadcrumbTypeSchema>;

export const breadcrumbsSchema = z.array(
  z.object({ name: z.string(), href: z.string() }),
);

export type TBreadcrumbs = z.infer<typeof breadcrumbsSchema>;

export const getBreadcrumbs = (
  type: TBreadcrumbType,
  loaderData: any,
  baseUrl: string,
) => {
  const pages: TBreadcrumbs = [{ href: baseUrl, name: 'Home' }];

  switch (type) {
    case 'collections':
      pages.push({
        href: '/collections',
        name: 'Collections',
      });
      break;
    case 'collection':
      pages.push({
        href: '/collections',
        name: 'Collections',
      });
      pages.push({
        href: `${baseUrl}/collections`,
        name: 'Collections',
      });
      break;
    case 'product':
      pages.push({
        href: `${baseUrl}/collections`,
        name: 'Collections',
      });
      pages.push({
        href: `${baseUrl}/collections/${loaderData.collection.handle}`,
        name: `${loaderData.collection.title}`,
      });
      pages.push({
        href: `${baseUrl}/products/${loaderData.product.handle}`,
        name: `${loaderData.product.title}`,
      });
      break;
    default:
      break;
  }
  return pages;
};

// Breadcrumbs schema markup dönüşüm fonksiyonu
export function getBreadcrumbsSchemaMarkup(breadcrumbs: Breadcrumb[]): string {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.href,
    })),
  };

  return JSON.stringify(schema);
}



// Interfaces
export interface CollectionData {
  collections?: {
    handle: string;
    title: string;
  };

  collection?: {
    handle: string;
    title: string;
  };

  product?: {
    handle: string;
    title: string;
    collections?: {
      nodes?: { handle: string; title: string }[];
    };
  };
  breadcrumbs?: TBreadcrumbs; // Update to TBreadcrumbs type
}

export interface Route {
  handle?: { breadcrumbType?: TBreadcrumbType }; // Update type
  data?: CollectionData;
}
