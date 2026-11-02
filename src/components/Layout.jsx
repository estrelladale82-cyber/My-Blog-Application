import { Suspense } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import ErrorFallback from "./ErrorFallback";

function Layout() {
  const location = useLocation();
  const { reset } = useQueryErrorResetBoundary();

  return (
    <>
      <header className="site-header">
        <Link to="/" className="logo">My Blog</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/posts/new">Write a post</Link>
        </nav>
      </header>

      <main className="container">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[location.pathname]}
          onReset={reset}
        >
          <Suspense fallback={<p className="status-message">Loading...</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  );
}

export default Layout;