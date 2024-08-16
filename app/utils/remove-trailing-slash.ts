import {redirect} from '@remix-run/server-runtime';

export function removeTrailingSlash(url: URL) {
  if (url.pathname.endsWith('/') && url.pathname !== '/') {
    const parsedUrl = url.toString().slice(0, url.toString().length - 1);
    throw redirect(parsedUrl);
  }
}
