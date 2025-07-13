import NavBar from "@/components/nav-bar";

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
      {children}
    </div>
  );
}
