import React, { useEffect } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
import { subNavigationDashboard } from "./SiteConfig";
import Link from "next/link";


const SubnavDashboard: React.FC<{pathname: string | string[] | undefined}> = ({pathname}) =>{
  const [TabOpen, setTab] = React.useState()

  return (
    <nav
      aria-label="Sections"
      className="hidden w-96 flex-shrink-0 border-r border-blue-gray-200 bg-white xl:flex xl:flex-col"
    >
      <div className="flex h-16 flex-shrink-0 items-center border-b border-blue-gray-200 px-6">
        <p className="text-lg font-medium text-blue-gray-900">Settings</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {subNavigationDashboard.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={
            classNames(
                item.name.toLowerCase()==pathname? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
              'flex p-6 border-b border-blue-gray-200'
            )}
            aria-current={item.name.toLowerCase()==pathname ? 'page' : undefined}
          >
            <item.icon className="-mt-0.5 h-6 w-6 flex-shrink-0 text-blue-gray-400" aria-hidden="true" />
            <div className="ml-3 text-sm">
              <p className="font-medium text-blue-gray-900">{item.name}</p>
              <p className="mt-1 text-blue-gray-500">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </nav>);
}
export default SubnavDashboard;