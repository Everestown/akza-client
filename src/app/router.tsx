import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'
import { Spinner } from '@/shared/ui/spinner'

const HomePage       = lazy(() => import('@/pages/home'))
const CollectionPage = lazy(() => import('@/pages/collection'))
const ProductPage    = lazy(() => import('@/pages/product'))
const VariantPage    = lazy(() => import('@/pages/variant'))
const NotFoundPage   = lazy(() => import('@/pages/not-found'))

function Loading() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <Spinner />
    </div>
  )
}

// ScrollRestoration is part of react-router-dom v6.4+
// It persists scroll positions per route key (back/forward navigation)
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollRestoration
          getKey={(location) => {
            // Use pathname for scroll key so different query params share position
            return location.pathname
          }}
        />
        <Suspense fallback={<Loading />}><HomePage /></Suspense>
      </>
    ),
  },
  {
    path: '/collections/:slug',
    element: (
      <>
        <ScrollRestoration getKey={(l) => l.pathname} />
        <Suspense fallback={<Loading />}><CollectionPage /></Suspense>
      </>
    ),
  },
  {
    path: '/collections/:slug/:productSlug',
    element: (
      <>
        <ScrollRestoration getKey={(l) => l.pathname} />
        <Suspense fallback={<Loading />}><ProductPage /></Suspense>
      </>
    ),
  },
  {
    path: '/collections/:slug/:productSlug/:variantSlug',
    element: (
      <>
        <ScrollRestoration getKey={(l) => l.pathname} />
        <Suspense fallback={<Loading />}><VariantPage /></Suspense>
      </>
    ),
  },
  {
    path: '*',
    element: <Suspense fallback={<Loading />}><NotFoundPage /></Suspense>,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
