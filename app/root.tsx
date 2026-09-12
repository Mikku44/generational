import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Toaster } from 'sonner'
import type { Route } from "./+types/root";
import { PhotoProvider } from 'react-photo-view';
import RouteLoadingIndicator from "~/components/RouteLoadingIndicator";
import "./app.css";
import 'react-photo-view/dist/react-photo-view.css';

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel:"icon",
    href:"/logo.png",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta() {
  return [
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#000000" },
    { property: "og:site_name", content: "GENERATIONAL" },
    { property: "og:locale", content: "en_US" },
  ];
}

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": "https://generational.co/#organization",
  name: "GENERATIONAL",
  url: "https://generational.co/",
  logo: "https://generational.co/logo.png",
  image: "https://generational.co/images/og.jpg",
  description:
    "Purveyor of the most beautiful, culturally significant classic automobiles in Thailand. Global sourcing, provenance verification, import, registration and preservation for discerning collectors.",
  telephone: "+66-91-991-1911",
  email: "HELLO@GENERATIONAL.CO",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangkok",
    addressCountry: "TH",
  },
  sameAs: ["https://www.instagram.com/drivegenerational/"],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://generational.co/#website",
  url: "https://generational.co/",
  name: "GENERATIONAL",
  publisher: { "@id": "https://generational.co/#organization" },
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </head>
      <body>
         <Toaster position="top-left" className="rounded-none" />
        <PhotoProvider>{children}</PhotoProvider>
       
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <RouteLoadingIndicator />
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
