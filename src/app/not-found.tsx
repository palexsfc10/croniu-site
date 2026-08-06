import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BrandWordmark } from "@/components/brand";

export default function NotFound() {
  return (
    <Container className="flex min-h-screen flex-col items-center justify-center gap-6 py-24 text-center">
      <BrandWordmark size="lg" />
      <p className="font-display text-2xl font-semibold text-ink">Página não encontrada</p>
      <p className="max-w-md text-ink/70">
        O endereço que você tentou acessar não existe ou foi movido. Volte para a página inicial para
        continuar.
      </p>
      <Button href="/">Voltar para o início</Button>
    </Container>
  );
}
