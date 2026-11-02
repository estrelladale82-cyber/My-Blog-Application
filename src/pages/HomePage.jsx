import { Link } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import PostCard from "../components/PostCard";

function HomePage() {
  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (posts.length === 0) {
    return (
      <div className="status-message">
        <p>No posts yet.</p>
        <Link to="/posts/new">Be the first to write one!</Link>
      </div>
    );
  }

  return (
    <section>
      <h1 className="page-title">Latest posts</h1>
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;