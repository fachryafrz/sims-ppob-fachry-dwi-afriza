import Saldo from "@/components/saldo";
import Welcome from "@/components/welcome";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* User Info & Saldo */}
      <div className="flex flex-col items-center justify-between gap-4 px-4 lg:flex-row xl:px-24">
        <Welcome />

        <Saldo />
      </div>

      {children}
    </>
  );
}
