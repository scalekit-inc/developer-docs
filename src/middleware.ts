import { defineMiddleware } from 'astro:middleware';
import { redirects } from './configs/redirects.config';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, redirect } = context;
  const pathname = url.pathname;

  // Check if this path should be redirected
  const redirectTarget = redirects[pathname as keyof typeof redirects];

  if (redirectTarget) {
    // Preserve query parameters, especially inproduct=true
    const searchParams = url.searchParams;
    const newUrl = new URL(redirectTarget, url.origin);

    // Copy all query parameters to the redirect target
    searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });

    return redirect(newUrl.toString(), 301);
  }

  return next();
});
