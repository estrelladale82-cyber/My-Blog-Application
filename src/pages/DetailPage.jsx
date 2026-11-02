import { useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPost } from "../api/posts";
import { formatDate } from "../utils/FormatDate";
import BackButton from "../components/BackButton";
import PostImage from "../components/PostImage";

function DetailPage() {
  const { slug } = useParams();

  const { data: post } = useSuspenseQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
  });

  const date = formatDate(post.createdAt, "long");

  return (
    <article className="post-detail">
      <BackButton />

      <PostImage key={post.id} src={post.featuredImage} className="post-image" />

      <h1 className="post-title">{post.title}</h1>

      <p className="post-meta">
        By {post.author ?? "Anonymous"}
        {date && ` · ${date}`}
      </p>

      <div className="post-content">{post.content}</div>
    </article>
  );
}

export default DetailPage;