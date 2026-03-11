import { AuthButton } from "@/components/auth-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import Navigation from "@/components/layout/navigation";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import CarrosList from "@/components/CarrosList";
import { ThemeSwitcher } from "@/components/theme-switcher";
import PropietariosList from "@/components/PropietariosList";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">

        <main className="flex-1 flex flex-col gap-6 px-4">
          <PropietariosList />
        </main>
      </div>
    </main>
  );
}