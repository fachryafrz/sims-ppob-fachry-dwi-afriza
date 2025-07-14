import ServiceForm from "@/components/service-form";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  return <ServiceForm service_code={code} />;
}
