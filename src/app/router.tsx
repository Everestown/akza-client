import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom'
import { Spinner } from '@/shared/ui/spinner'
import { SmoothScrollProvider } from './providers/smooth-scroll'

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

/**
 * Root layout — wraps all routes.
 * SmoothScrollProvider lives here so Lenis persists across navigations.
 * ScrollRestoration is here once (not per-route) to prevent duplication.
 */
function RootLayout() {
  return (
    <SmoothScrollProvider>
      <ScrollRestoration getKey={(l) => l.pathname} />
      <Outlet />
    </SmoothScrollProvider>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<Loading />}><HomePage /></Suspense>,
      },
      {
        path: '/collections/:slug',
        element: <Suspense fallback={<Loading />}><CollectionPage /></Suspense>,
      },
      {
        path: '/collections/:slug/:productSlug',
        element: <Suspense fallback={<Loading />}><ProductPage /></Suspense>,
      },
      {
        path: '/collections/:slug/:productSlug/:variantSlug',
        element: <Suspense fallback={<Loading />}><VariantPage /></Suspense>,
      },
      {
        path: '*',
        element: <Suspense fallback={<Loading />}><NotFoundPage /></Suspense>,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
