export function Logo() {
  return (
    <a href="/" aria-label="Ir al inicio">
      <figure className="flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Logo Winker"
          className="size-8 object-contain"
        />
        <p className="font-semibold text-xl hidden xl:block">Winkermind</p>
      </figure>
    </a>
  );
}
