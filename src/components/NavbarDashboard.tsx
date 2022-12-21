import React from "react";
import { companyLogo, navigationDashboard } from "./SiteConfig";
import { useSession } from "next-auth/react";

export default function NavbarDashboard() {
  const { data: sessionData } = useSession();
  return (<>
    {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-20 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-purple-600">
            <div className="flex-1">
              <div className="flex items-center justify-center bg-white py-4">
                <img
                  className="h-10 w-auto"
                  src={companyLogo}
                  alt="Your Company"
                />
              </div>
              <nav aria-label="Sidebar" className="flex flex-col items-center space-y-3 py-6">
                {navigationDashboard.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center rounded-lg p-4 text-purple-200 hover:bg-purple-700"
                  >
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 pb-5">
              <a href="#" className="w-full flex-shrink-0">
                <img
                  className="mx-auto block h-10 w-10 rounded-full"
                  src={sessionData?.user?.image||"/img/avatar.svg"}
                  alt=""
                />
                <div className="sr-only">
                  <p>Lisa Marie</p>
                  <p>Account settings</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
  </>

  )
}