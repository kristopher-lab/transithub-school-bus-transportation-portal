import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { MainLayout } from '@/components/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { DelaysPage } from '@/pages/DelaysPage';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/delays",
        element: <DelaysPage />,
      },
      {
        path: "/parents",
        element: <div className="max-w-7xl mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-black uppercase italic">Parent Resources Coming Soon</h1></div>,
      },
      {
        path: "/contact",
        element: <div className="max-w-7xl mx-auto px-4 py-20 text-center"><h1 className="text-4xl font-black uppercase italic">Contact Directory Coming Soon</h1></div>,
      }
    ]
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)