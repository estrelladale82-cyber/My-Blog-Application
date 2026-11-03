# My Blog

A blog application built with **React**, **React Router** and **TanStack Query**. Readers can browse posts as cards, open any post to read it in full, and publish new posts of their own. It was built as a learning project to practise client-side routing, data fetching, Suspense, Error Boundaries and lazy loading.

**Live demo:** [my-blog-application-alt.netlify.app](https://my-blog-application-alt.netlify.app)

![Screenshot of the blog's home page](./screenshot.png)
<!-- Add a screenshot named screenshot.png to the repo root, or update the path above. -->

---

## Features

- **Home page** with posts displayed as responsive cards (title, excerpt, author and date)
- **Dynamic detail pages** at `/posts/:slug`, one template serving every post
- **Create new posts** through a validated form
- **Back navigation** from any page, with a smart Back button that returns Home if the reader arrived from outside the site
- **Two kinds of 404 handling**: a fallback page for unknown routes, and a "Post not found" message for missing posts
- **Error Boundary** that contains crashes and offers a "Try again" option, while the header stays usable
- **Suspense with lazy loading**: page code and data load on demand behind a single loading fallback
- **Caching**: revisited pages appear instantly, and new posts appear in the list straight after publishing
- **Graceful handling of messy data**: placeholder images for missing or broken images, fallback excerpts and authors, and long words that wrap instead of breaking the layout
- **Accessible and responsive**: labelled form fields, visible keyboard focus, reduced-motion support, and a layout that adapts from phone to desktop

## Tech stack

| Purpose | Tool |
| --- | --- |
| UI | [React](https://react.dev) |
| Build tool | [Vite](https://vite.dev) |
| Routing | [React Router](https://reactrouter.com) |
| Data fetching and caching | [TanStack Query](https://tanstack.com/query) |
| Error Boundary | [react-error-boundary](https://github.com/bvaughn/react-error-boundary) |
| Styling | Plain CSS with custom properties |
| Data | [api.oluwasetemi.dev](https://api.oluwasetemi.dev) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) version 20 or later
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/estrelladale82-cyber/My-Blog-Application.git
cd My-Blog-Application
npm install
npm run dev
```

Then open the address shown in the terminal, usually `http://localhost:5173`.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production into the `dist` folder |
| `npm run preview` | Serves the production build locally to check it |

## Project structure

```
My-Blog-Application/
├── index.html              fonts and page title
├── public/
│   └── placeholder.jpg     fallback image for posts
└── src/
    ├── main.jsx            sets up TanStack Query and the router
    ├── App.jsx             route definitions, with lazy-loaded pages
    ├── index.css           all styles
    ├── api/
    │   └── posts.js        getPosts, getPost and createPost
    ├── utils/
    │   └── formatDate.js   shared date formatting
    ├── components/
    │   ├── Layout.jsx      header, Error Boundary, Suspense and Outlet
    │   ├── ErrorFallback.jsx
    │   ├── BackButton.jsx
    │   ├── PostCard.jsx
    │   └── PostImage.jsx
    └── pages/
        ├── HomePage.jsx
        ├── detailpage.jsx
        ├── createpost.jsx
        └── NotFoundPage.jsx
```

## How it works

### Routes

| Path | Page | Loaded |
| --- | --- | --- |
| `/` | Home: all posts as cards | Immediately |
| `/posts/new` | Create a new post | Lazily, on first visit |
| `/posts/:slug` | Full post, looked up by its slug | Lazily, on first visit |
| `*` | 404 Page not found | Lazily, on first visit |

All routes sit inside a shared `Layout`, so the header with its Home link appears on every page.

### Data fetching

- Posts are read with `useSuspenseQuery`, so pages simply use their data while **Suspense** shows the loading state and the **Error Boundary** handles failures.
- Each post is cached under its own key, `["post", slug]`, so revisiting a post is instant.
- New posts are sent with `useMutation`. On success, the post list is refreshed, the new post is placed straight into the cache, and the reader is taken to it.
- Requests for posts that don't exist are tagged with a 404 status, so they show "Post not found" and aren't retried.

### API

This project uses the public Posts API at [api.oluwasetemi.dev](https://api.oluwasetemi.dev) ([interactive docs](https://api.oluwasetemi.dev/reference)).

| Request | Purpose |
| --- | --- |
| `GET /posts` | List posts |
| `GET /posts/{slug}` | Get a single post by slug or ID |
| `POST /posts` | Create a post (`title` and `content` are required) |

> **Note:** this is a shared learning API, so posts from other people appear in the list, and any posts you create are visible to others.

## What I learned

- How a router connects the URL to what's on screen, and why `<Link>` keeps an app fast where a normal link reloads everything
- How dynamic routes and `useParams` let one page serve every post
- How TanStack Query manages loading, error and success states, and how its cache makes revisits instant
- Why a cache must be invalidated after creating data, or new content seems to vanish
- How Suspense and Error Boundaries work as a team: one handles waiting, the other handles breaking
- How lazy loading splits the app into smaller files that download only when needed
- How to debug with the browser's developer tools: throttling, request blocking, the console, and the TanStack Query devtools
- That real-world data is messy, and good interfaces plan for missing fields, broken images and very long words

## Possible improvements

- Pagination using the API's `meta.hasNextPage`
- Login with the API's authentication endpoints, allowing readers to edit and delete their own posts
- Search and filtering by category
- Comments on posts, using the API's comments endpoints
- A dark mode built on the existing CSS custom properties

## Deployment

The app can be deployed to services such as [Netlify](https://www.netlify.com) or [Vercel](https://vercel.com). Because it's a single page application, the host must send every route to `index.html`, or refreshing a page like `/posts/hello-world` will show the host's own 404 page.

**Netlify:** add a file at `public/_redirects` containing:

```
/*  /index.html  200
```

**Vercel:** add a `vercel.json` file to the project root containing:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Acknowledgements

- [Oluwasetemi Ojo](https://github.com/Oluwasetemi) for the API used in this project
- Fonts: [Lora](https://fonts.google.com/specimen/Lora) and [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts

## Author

**Eleojo Esther (Estrella) Akpa**

[GitHub](https://github.com/estrelladale82-cyber)
[LinkedIn](www.linkedin.com/in/akpa-eleojo-esther)
