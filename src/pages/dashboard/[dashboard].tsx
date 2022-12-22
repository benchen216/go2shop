import React, { Fragment, useState } from 'react'
import { Dialog, Switch, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import ProductTable from "../../components/ProductTable";
import SubnavDashboard from "../../components/SubnavDashboard";
import NavbarDashboard from "../../components/NavbarDashboard";
import { companyLogo, companyName, navigationDashboard } from "../../components/SiteConfig";
import CategoryTable from "../../components/CategoryTable";
import OrderTable from "../../components/OrderTable";
import SiteSettingTable from "../../components/SiteSettingTable";
import { useRouter } from "next/router";
import ReportPage from "../../components/ReportPage";
import ProfileSetting from "../../components/PofileSetting";
import AppearanceSetting from "../../components/AppearanceSetting";

export default function Dashboard() {
  const { data: sessionData } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { dashboard } = router.query
  return (
    <>
      <div className="flex h-full">
        <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-purple-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-4">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src={companyLogo}
                        alt={companyName}
                      />
                    </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {navigationDashboard.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center rounded-md p-2 text-base font-medium text-purple-gray-600 hover:bg-purple-gray-50 hover:text-purple-gray-900"
                          >
                            <item.icon
                              className="mr-4 h-6 w-6 text-purple-gray-400 group-hover:text-purple-gray-500"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-purple-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src={sessionData?.user?.image||"/img/avatar.svg"}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-purple-gray-700 group-hover:text-purple-gray-900">
                            Lisa Marie
                          </p>
                          <p className="text-sm font-medium text-purple-gray-500 group-hover:text-purple-gray-700">
                            Account Settings
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* Static sidebar for desktop */}
        <NavbarDashboard />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Mobile top navigation */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-purple-600 py-2 px-4 sm:px-6">
              <div className="bg-white">
                <img
                  className="h-12 w-auto"
                  src={companyLogo}
                  alt={companyName}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <main className="flex flex-1 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-y-auto xl:overflow-hidden">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="border-b border-purple-gray-200 bg-white xl:hidden">
                <div className="mx-auto flex max-w-3xl items-start py-3 px-4 sm:px-6 lg:px-8">
                  <a
                    href="#"
                    className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-purple-gray-900"
                  >
                    <ChevronLeftIcon className="h-5 w-5 text-purple-gray-400" aria-hidden="true" />
                    <span>Settings</span>
                  </a>
                </div>
              </nav>

              <div className="flex flex-1 xl:overflow-hidden">
                {/* Secondary sidebar */}
                <SubnavDashboard pathname={dashboard}/>

                {/* Main content */}
                <div className="flex-1 xl:overflow-y-auto">

                  <div className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:py-12 lg:px-0">
                    <h1 className="text-3xl font-bold tracking-tight text-purple-gray-900">{dashboard}</h1>
                    <form className="divide-y-purple-gray-200 mt-6 space-y-8 divide-y">
                      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                        <DashboardSwitch/>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
const DashboardSwitch = () => {
  const router = useRouter()
  const { dashboard } = router.query
  function renderSwitch(dashboard: string | string[] | undefined) {
    switch (dashboard) {
      case 'products':
        return <>
          <div className="sm:col-span-6">
            <ProductTable  />
          </div>
          <div className="sm:col-span-6">
            <CategoryTable />
          </div>
        </>
      case 'account':
        return <><ProfileSetting/></>
      case 'report':
        return <><ReportPage/></>
      case 'billing':
        return <>
          <div className="sm:col-span-6">
            <OrderTable />
          </div>
        </>
      case 'appearance':
        return <AppearanceSetting/>
      default:
        return <></>
    }
  }
  return (
    <>
      {renderSwitch(dashboard)}
    </>
  )
}

const ProfileSetting3= () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
        <div className="sm:col-span-6">
          <h2 className="text-xl font-medium text-purple-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm text-purple-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="email-address" className="block text-sm font-medium text-purple-gray-900">
            Email address
          </label>
          <input
            type="text"
            name="email-address"
            id="email-address"
            autoComplete="email"
            className="mt-1 block w-full rounded-md border-purple-gray-300 text-purple-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="phone-number" className="block text-sm font-medium text-purple-gray-900">
            Phone number
          </label>
          <input
            type="text"
            name="phone-number"
            id="phone-number"
            autoComplete="tel"
            className="mt-1 block w-full rounded-md border-purple-gray-300 text-purple-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="country" className="block text-sm font-medium text-purple-gray-900">
            Country
          </label>
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="mt-1 block w-full rounded-md border-purple-gray-300 text-purple-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          >
            <option />
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="language" className="block text-sm font-medium text-purple-gray-900">
            Language
          </label>
          <input
            type="text"
            name="language"
            id="language"
            className="mt-1 block w-full rounded-md border-purple-gray-300 text-purple-gray-900 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
        </div>

        <p className="text-sm text-purple-gray-500 sm:col-span-6">
          This account was created on{' '}
          <time dateTime="2017-01-05T20:35:40">January 5, 2017, 8:35:40 PM</time>.
        </p>
      </div>
      </>)
}

