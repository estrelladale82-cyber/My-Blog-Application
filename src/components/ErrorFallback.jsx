import { Link } from "react-router";
import BackButton from "./BackButton";

function ErrorFallback({ error, resetErrorBoundary }) {
  if (error.status === 404) {
    return (
      <div className="status-message">
        <BackButton />
        <h1>Post not found</h1>
        <p>This post doesn't exist or may have been removed.</p>
        <Link to="/">Back to all posts</Link>
      </div>
    );
  }

  return (
    <div className="status-message">
      <h1>Something went wrong</h1>
      <p>We hit a snag loading this page. Please try again.</p>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

export default ErrorFallback;