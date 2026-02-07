export function Logo() {
  return (
    <a href="#hero" aria-label="Ir al inicio">
      <figure className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Logo Winker"
          className="size-8 object-contain"
        />
        <p className="font-semibold text-xl">Winkermind</p>
      </figure>
    </a>
  );
}
