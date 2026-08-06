import { ImageResponse } from "next/og";
import { ogImageSize, OgImageMarkup } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <OgImageMarkup subtitle="Sua rotina organizada. Seus clientes acompanhados. Uma IA trabalhando com você." />,
    { ...size },
  );
}
