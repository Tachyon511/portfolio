type ProjectVideoProps = {
  src: string;
  title?: string;
  poster?: string;
};

export default function ProjectVideo({
  src,
  title,
  poster,
}: ProjectVideoProps) {
  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-white/10 bg-black">
      {/* 16:9 presentation, regardless of the video's native resolution. */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          src={src}
          poster={poster}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
      {title && (
        <div className="border-t border-white/10 bg-[#11151a] px-4 py-3 text-sm text-zinc-400">
          {title}
        </div>
      )}
    </div>
  );
}
