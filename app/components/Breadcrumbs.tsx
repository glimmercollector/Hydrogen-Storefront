import {HomeIcon} from '@heroicons/react/20/solid';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import {Link, useMatches} from '@remix-run/react';
import {
  breadcrumbsSchema,
  breadcrumbTypeSchema,
  Route,
} from '~/utils/breadcrumbs';

export default function Breadcrumbs() {
  const matches = useMatches();
  console.log(matches);

  const deepestRoute = matches.at(-1) as Route | undefined;

  const parsedBreadcrumbType = breadcrumbTypeSchema.safeParse(
    deepestRoute?.handle?.breadcrumbType,
  );

  const isValidBreadcrumbType = parsedBreadcrumbType.success;

  if (!isValidBreadcrumbType) return null;

  const parsed = breadcrumbsSchema.safeParse(deepestRoute?.data?.breadcrumbs);

  if (!parsed.success) {
    return
  }

  const pages = parsed.data;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {pages.map((page, idx) => {
          const currentPage = idx === pages.length - 1;
          const homePage = page.href === '/';

          const separator = idx !== 0 && (
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
          );
          return (
            <li key={page.name}>
              <div className="flex items-center">
                {separator}

                <span className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {currentPage ? (
                    page.name
                  ) : (
                    <Link to={page.href}>
                      {homePage ? (
                        <HomeIcon
                          className="h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        page.name
                      )}
                    </Link>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
