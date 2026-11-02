import { Link } from "react-router";
import BackButton from "../components/BackButton";

function NotFoundPage() {
  return (
    <div>
      <BackButton />
      <h1>Page not found</h1>
      <p>Sorry, we couldn't find what you were looking for.</p>
      <Link to="/">Take me home</Link>
    </div>
  );
}

export default NotFoundPage;