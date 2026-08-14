import { defineRouteMiddleware } from '@astrojs/starlight/route-data'
import {
  SHARED_HOW_TO_COLD_DEFAULT_PRODUCT,
  guidesTopicForProduct,
  isDocsProduct,
  isSharedHowToPath,
  type DocsProduct,
} from '../configs/self-hosted'

export const onRequest = defineRouteMiddleware((context) => {
  const pathname = context.url.pathname
  if (!isSharedHowToPath(pathname)) return

  // Prefer product resolved in src/middleware.ts (has the real request URL + cookies
  // when the route is server-rendered). On prerendered builds this falls back.
  const fromLocals = (context.locals as { skHowToProduct?: DocsProduct }).skHowToProduct
  const product: DocsProduct = isDocsProduct(fromLocals)
    ? fromLocals
    : SHARED_HOW_TO_COLD_DEFAULT_PRODUCT

  const topic = guidesTopicForProduct(product)
  const data = context.locals.starlightRoute.entry.data as { topic?: string }
  try {
    data.topic = topic
  } catch {
    Object.assign(context.locals.starlightRoute.entry, {
      data: { ...context.locals.starlightRoute.entry.data, topic },
    })
  }
})
