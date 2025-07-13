import Saldo from "@/components/saldo";
import ServiceForm from "@/components/service-form";
import Welcome from "@/components/welcome";
import { ACCESS_TOKEN } from "@/lib/constants";
import { ServicesType } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const cookieStore = await cookies();

  const { data } = await axios.get(`${process.env.API_URL}/services`, {
    headers: {
      Authorization: `Bearer ${cookieStore.get(ACCESS_TOKEN)?.value}`,
    },
  });

  const service: ServicesType = data.data.find(
    (service: ServicesType) => service.service_code === code,
  );

  return (
    <>
      {/* User Info & Saldo */}
      <div className="flex items-center justify-between px-24">
        <Welcome />

        <Saldo />
      </div>

      {/* Service Info */}
      <div className="space-y-2 px-24">
        <h2 className="font-medium">Pembayaran</h2>
        <div className="flex items-center gap-2">
          <img src={service.service_icon} alt="" className="w-8" />
          <span>{service.service_name}</span>
        </div>
      </div>

      {/* Service Form */}
      <ServiceForm service={service} />
    </>
  );
}
