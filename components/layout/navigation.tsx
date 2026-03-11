import Link from "next/link";

export default function Navigation() {
    // Navigation items array
  const navItems = [
    { name: "Carros", href: "/carros" },
    { name: "Propietarios", href: "/propietarios" },
    { name: "Infracciones", href: "/infracciones" },
  ];
    return (
        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center p-1 text-lg gap-x-2 text-slate-600 hover:text-red-500"
                >
                  <Link href={item.href} className="flex items-center">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
    );
}