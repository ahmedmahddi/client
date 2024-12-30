import { lazy, Suspense, ReactElement, PropsWithChildren } from "react";
import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import paths,{ RootPaths } from "./paths";
import PageLoader from "components/loading/PageLoader";
import Splash from "components/loading/Splash";
import ScrollToTop from '../components/ScrollToTop';

const App = lazy<() => ReactElement>(() => import("App"));
//layouts
const LandingLayout = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("layouts/landing-layout")
);
const MainLayout = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("layouts/main-layout")
);
const AuthLayout = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("layouts/auth-layout")
);
//Landing pages
const LandingPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/LandingPage")
);

const AboutUsPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/AboutUsPage")
);
const ServicesPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/ServicesPage")
);
const PortfolioPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/PortfolioPage")
);
const ContactUsPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/ContactUsPage")
);
const DevisFormPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/DevisFormPage")
);
const ServiceDetailsPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/ServiceDetailsPage")
);
const BlogDetailsPage = lazy<({ children }: PropsWithChildren) => ReactElement>(
  () => import("pages/landing/BlogDetailsPage")
);
// auth/main pages
const Dashboard = lazy<() => ReactElement>(() => import('pages/dashboard/Dashboard'));
const Login = lazy<() => ReactElement>(() => import('pages/authentication/Login'));
const SignUp = lazy<() => ReactElement>(() => import('pages/authentication/SignUp'));
const ErrorPage = lazy<() => ReactElement>(() => import('pages/error/ErrorPage'));
const PortfolioListPage = lazy<() => ReactElement>(() => import('pages/admin/Gallery/PortfolioListPage'));
const ProductsListPage = lazy<() => ReactElement>(() => import('pages/admin/Services/ProductsListPage'));
const TestimonialsPage = lazy<() => ReactElement>(() => import('pages/admin/About/TestimonialsPage'));
const PartnersPage = lazy<() => ReactElement>(() => import('pages/admin/About/PartnersPage'));
const SliderPage = lazy<() => ReactElement>(() => import('pages/admin/Slider/SliderPage'));
const DevisListPage = lazy<() => ReactElement>(() => import('pages/admin/Devis/DevisListPage'));
const MessagesListPage = lazy<() => ReactElement>(() => import('pages/admin/Contact/MessagesListPage'));
const BlogListPage = lazy<() => ReactElement>(() => import('pages/Blog/BlogListPage'));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      </>
    ),
    children: [
      {
        path: RootPaths.landingRoot,
        element: (
          <LandingLayout >
            <Suspense>
              <Outlet />
            </Suspense>
          </LandingLayout>
        ),
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "about",
            element: <AboutUsPage />,
          },
          {
            path: "services",
            element: <ServicesPage />,
          },
          {
            path: "gallery",
            element: <PortfolioPage />,
          },
          {
            path: "contact",
            element: <ContactUsPage />,
          },
          {
            path: "formulaire",
            element: <DevisFormPage />,
          },
          {
            path: "services/:id",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ServiceDetailsPage />
              </Suspense>
            ),
          },
          {
            path: "blog/:id",
            element: (
              <Suspense fallback={<PageLoader />}>
                <BlogDetailsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: paths.dashboard,
        element: (
          <MainLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'gallery',
            children: [
              {
                path: 'list',
                element: <PortfolioListPage />
              },
            ]
          },
          {
            path: 'services',
            children: [
              {
                path: 'products',
                element: <ProductsListPage />
              },
            ]
          },
          {
            path: 'about',
            children: [
              {
                path: 'testimonials',
                element: <TestimonialsPage />
              },
              {
                path: 'partners',
                element: <PartnersPage />
              }
            ]
          },
          {
            path: 'slider',
            element: <SliderPage />
          },
          {
            path:'devis',
            element: <DevisListPage />
          },
          {
            path:'messages',
            element: <MessagesListPage />
          },
          {
            path: 'blogs',
            element: <BlogListPage />,
          },
        ],
      },
      {
        path: RootPaths.authRoot,
        element: (
          <AuthLayout>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </AuthLayout>
        ),
        children: [
          {
            path: paths.login,
            element: <Login />,
          },
          {
            path: paths.signup,
            element: <SignUp />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

const options: { basename: string } = {
  basename: "/",
};

const router = createBrowserRouter(routes, options);

export default router;
