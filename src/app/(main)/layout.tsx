import Modal from "@/components/modal";
import NavBar from "@/components/nav-bar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      {/* Navbar */}
      <NavBar />

      {/* Content */}
      <div className="mx-auto flex flex-col gap-12 py-8">{children}</div>

      {/* Modal */}
      <Modal />
    </div>
  );
}
