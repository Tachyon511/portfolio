type ProjectVideoProps = {
  src: string;
  title?: string;
};

export default function ProjectVideo({ src, title }: ProjectVideoProps) {
  return (
    <span className="my-8 block overflow-hidden rounded-lg border border-white/10">
      <video
        src={src}
        controls
        muted
        loop
        playsInline
        className="block w-full bg-black"
      />

      {title && (
        <span className="block border-t border-white/10 bg-[#11151a] px-4 py-3 text-sm text-zinc-400">
          {title}
        </span>
      )}
    </span>
  );
}