import NavBar from "@/components/layout/NavBar";

export default function Layout({children,}: { children: React.ReactNode; }) {
  return (
    <main className="h-screen flex flex-col">
      <NavBar/>
      <div className="flex-1 overflow-hidden min-h-0">
        {children}
      </div>
    </main>
  );
}