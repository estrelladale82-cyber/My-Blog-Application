import { Link } from "react-router";
import { formatDate } from "../utils/FormatDate";
import PostImage from "./PostImage";

function PostCard({ post }) {
  const preview = post.excerpt ?? post.content.slice(0, 120) + "…";
  const date = formatDate(post.createdAt);

  return (
    <article className="card">
      <Link to={`/posts/${post.slug}`} className="card-link">
        <PostImage src={post.featuredImage} className="card-image" />
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-excerpt">{preview}</p>
          <div className="card-footer">
            <span className="card-meta">
              {post.author ?? "Anonymous"}
              {date && ` · ${date}`}
            </span>
            <span className="card-cta">Read more →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;