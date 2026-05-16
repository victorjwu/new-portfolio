import manifest from "../content/photo-manifest.json";

type ManifestEntry = {
  formats?: ("avif" | "webp")[];
  aspectRatio?: number;
  width?: number;
};

const M = manifest as Record<string, ManifestEntry>;

type Props = {
  /** Path to the JPG/PNG, e.g. "/assets/photos/kyodo.jpg". The optimizer
   *  generates AVIF/WebP siblings and registers them in photo-manifest.json. */
  src: string;
  alt: string;
  /** First-screen images: render eager + high priority. Defaults to lazy. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

export default function Photo({
  src,
  alt,
  priority,
  className,
  imgClassName,
}: Props) {
  const entry = M[src] ?? {};
  const base = src.replace(/\.[^.]+$/, "");
  const formats = entry.formats ?? [];

  return (
    <picture className={className}>
      {formats.includes("avif") && (
        <source srcSet={`${base}.avif`} type="image/avif" />
      )}
      {formats.includes("webp") && (
        <source srcSet={`${base}.webp`} type="image/webp" />
      )}
      <img
        className={imgClassName}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    </picture>
  );
}
