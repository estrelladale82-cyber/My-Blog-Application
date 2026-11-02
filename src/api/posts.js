//Functions for interacting with the API to fetch and create blog posts.


const BASE_URL = "https://api.oluwasetemi.dev";

// GET list of all posts (for the Home page)
export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Could not load posts");
  }

  const result = await response.json();
  return result.data;
}

// GET one post by its slug (for the Detail page)
export async function getPost(slug) {
  const response = await fetch(`${BASE_URL}/posts/${encodeURIComponent(slug)}`);

  if (response.status === 404) {
    const error = new Error("Post not found");
    error.status = 404;
    throw error;
  }

  if (!response.ok) {
    throw new Error("Could not load this post");
  }

  return response.json();
}

// POST a new post (for the Create page)
export async function createPost(newPost) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("Could not create the post");
  }

  return response.json();
}