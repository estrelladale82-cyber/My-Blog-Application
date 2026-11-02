import { useState } from "react";

const FALLBACK_IMAGE = "/placeholder.jpg";

function PostImage({ src, className }) {
  const [failed, setFailed] = useState(false);

  const imageSrc = !src || failed ? FALLBACK_IMAGE : src;

  return (
    <img
      src={imageSrc}
      alt=""
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default PostImage;