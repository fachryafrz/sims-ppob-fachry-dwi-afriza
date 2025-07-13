import NavBar from "@/components/nav-bar";
import Saldo from "@/components/saldo";
import Welcome from "@/components/welcome";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="mx-auto flex flex-col gap-12 py-8">
        {/* User Info & Saldo */}
        <div className="flex items-center justify-between px-24">
          <Welcome />

          <Saldo />
        </div>

        {children}
      </div>
    </div>
  );
}
