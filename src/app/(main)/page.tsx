import Banner from "@/components/banner";
import Saldo from "@/components/saldo";
import Services from "@/components/services";
import Welcome from "@/components/welcome";

export default function Home() {
  return (
    <>
      {/* User Info & Saldo */}
      <div className="flex items-center justify-between px-24">
        <Welcome />

        <Saldo />
      </div>

      {/* Services */}
      <Services />

      {/* Banner */}
      <Banner />
    </>
  );
}
