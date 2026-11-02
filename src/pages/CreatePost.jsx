import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/posts";
import BackButton from "../components/BackButton";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (savedPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["post", savedPost.slug], savedPost);
      navigate(`/posts/${savedPost.slug}`);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setFormError("Please add both a title and some content.");

      const trimmedAuthor = author.trim();

      if (trimmedAuthor.length > 0 && trimmedAuthor.length < 3) {
        setFormError("Name must be at least 3 characters long.");
        return;
      }
      return;
    }

    setFormError("");

    mutation.mutate({
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
      status: "PUBLISHED",
    });
  }

  return (
    <section className="create-post">
      <BackButton />
      <h1 className="page-title">Write a new post</h1>

      <form onSubmit={handleSubmit} className="post-form">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="author">Your name</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="default to Anonymous"
          minLength={3}
          maxLength={50}
        />

       {author.trim().length > 0 && author.trim().length < 3 && (
  <p className="form-error">Name must be at least 3 characters long.</p>
)}

        <label htmlFor="excerpt">Short summary</label>
        <input
          id="excerpt"
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A one-line teaser for the Home page"
        />

        <label htmlFor="content">Content *</label>
        <textarea
          id="content"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {formError && <p className="form-error">{formError}</p>}

        {mutation.isError && (
          <p className="form-error">
            Sorry, we couldn't save your post. Please try again.
          </p>
        )}

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Publishing..." : "Publish post"}
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
