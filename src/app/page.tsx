export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 py-12 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 98, 31, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 98, 31, 0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -left-36 -top-36 h-96 w-96 rounded-full bg-[#ff5a1f]/25 blur-3xl"
      />
      <div aria-hidden="true" className="absolute -bottom-48 -right-48 h-[34rem] w-[34rem] rounded-full border border-[#ff5a1f]/25" />
      <div aria-hidden="true" className="absolute -bottom-32 -right-32 h-[25rem] w-[25rem] rounded-full border border-[#ff5a1f]/15" />

      <section className="relative w-full max-w-4xl border-y border-[#ff5a1f]/35 py-10 text-center sm:py-14">
        <div role="img" aria-label="CRONIU Labs" className="inline-flex items-center gap-3 text-left">
          <span aria-hidden="true" className="text-2xl font-black tracking-[0.14em] text-white sm:text-3xl">
            CRONIU
          </span>
          <span aria-hidden="true" className="border border-[#ff5a1f] px-2 py-1 text-xs font-bold tracking-[0.22em] text-[#ff6b35] sm:text-sm">
            LABS
          </span>
        </div>

        <p className="mt-14 text-xs font-bold tracking-[0.28em] text-[#ff6b35]">EM ATUALIZAÇÃO</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-6xl">
          Estamos preparando uma nova experiência.
        </h1>
        <p className="mx-auto mt-7 max-w-md text-base leading-7 text-zinc-300 sm:text-lg">
          Nosso site está em manutenção. Em breve, novidades.
        </p>

        <div className="mx-auto mt-12 flex w-fit items-center gap-3 border border-[#ff5a1f]/45 bg-black/40 px-4 py-3 text-left">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#ff5a1f] shadow-[0_0_16px_4px_rgba(255,90,31,0.35)]" />
          <span className="text-xs font-semibold tracking-[0.18em] text-zinc-200">SISTEMA EM PREPARAÇÃO</span>
        </div>
      </section>
    </main>
  );
}
