import Link from "next/link";

export default function Navigation() {
  const navItems = [
    { name: "Carros", href: "/carros" },
    { name: "Propietarios", href: "/propietarios" },
    { name: "Infracciones", href: "/infracciones" },
    { name: "Generar Reporte", href: "/reporte" },
    { name: "GraphQL", href: "/graphql"}
  ];

  return (
    <ul className="flex flex-row items-center gap-6">
      {navItems.map((item, index) => (
        <li key={index}>
          <Link
            href={item.href}
            className="text-sm font-medium text-slate-600 hover:text-red-500 transition-colors"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}