import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResponsiveWorkspaceDemo } from "@/components/landing/demos/responsive-workspace-demo";
import { SectionViewTracker } from "./section-view-tracker";

export function LpDevicesSection() {
  return (
    <section className="bg-brand-50/50 py-16 sm:py-24">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Onde você já trabalha"
          title="No computador para organizar. No celular para acompanhar."
          description="A mesma conta, sempre sincronizada — sem versão limitada no celular."
        />
        <ResponsiveWorkspaceDemo />
      </Container>
      <SectionViewTracker featureId="lp_ads_devices" />
    </section>
  );
}
