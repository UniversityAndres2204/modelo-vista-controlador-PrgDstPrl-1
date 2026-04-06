import Link from "next/link";
import Navigation from "@/components/layout/navigation";
import {hasEnvVars} from "@/lib/utils";
import {EnvVarWarning} from "@/components/env-var-warning";
import {Suspense} from "react";
import {AuthButton} from "@/components/auth-button";

export default function NavBar() {
  return <>
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-opacity-90">
      <div className="w-ful flex justify-between p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>Secretaria de Transito de Sabaneta</Link>
          <Navigation/>
        </div>
        {!hasEnvVars ? (
          <EnvVarWarning/>
        ) : (
          <div className="px-4">
            <Suspense >
              <AuthButton/>
            </Suspense>
          </div>
        )}
      </div>
    </nav>
  </>
}