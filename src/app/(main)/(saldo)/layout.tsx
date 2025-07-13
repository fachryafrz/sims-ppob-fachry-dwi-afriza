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
      <div className="flex items-center justify-between px-24">
        <Welcome />

        <Saldo />
      </div>

      {children}
    </>
  );
}
