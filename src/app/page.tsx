import { BrandWordmark } from "@/components/brand";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-950 px-6 py-12 text-white">
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-ai-600/25 blur-3xl"
      />

      <section className="relative w-full max-w-2xl text-center">
        <BrandWordmark size="xl" tone="dark" className="text-5xl sm:text-6xl" />
        <div className="mx-auto mt-10 h-px w-16 bg-brand-300/70" />
        <h1 className="mt-10 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
          Estamos preparando uma nova experiência.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-slate-300 sm:text-lg">
          Nosso site está em manutenção. Em breve, novidades.
        </p>
      </section>
    </main>
  );
}
