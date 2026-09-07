function isLocalPng(src) {
  return typeof src === "string" && src.startsWith("/images/") && /\.png($|\?)/i.test(src);
}

function toWebpSrc(src, width) {
  const cleanSrc = src.split("?")[0];
  return cleanSrc.replace(/\.png$/i, `-${width}.webp`);
}

export default function OptimizedImage({
  src,
  alt,
  className,
  eager = false,
  sizes = "(max-width: 700px) 92vw, 33vw",
  ...props
}) {
  const image = (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      fetchPriority={eager ? "high" : "auto"}
      {...props}
    />
  );

  if (!isLocalPng(src)) {
    return image;
  }

  return (
    <picture className={className}>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={[360, 720, 1200, 1600].map((width) => `${toWebpSrc(src, width)} ${width}w`).join(", ")}
      />
      {image}
    </picture>
  );
}
