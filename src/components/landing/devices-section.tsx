import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionViewTracker } from "@/components/lp-google-ads/section-view-tracker";
import { ResponsiveWorkspaceDemo } from "./demos/responsive-workspace-demo";

export function DevicesSection() {
  return (
    <section className="bg-brand-50/50 py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Onde você já trabalha"
          title="No computador para organizar. No celular para acompanhar."
          description="A mesma conta, sempre sincronizada, direto no navegador — sem instalar nada e sem versão limitada no celular."
        />
        <ResponsiveWorkspaceDemo />
      </Container>
      <SectionViewTracker featureId="home_devices" />
    </section>
  );
}
