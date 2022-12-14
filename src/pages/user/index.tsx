import  Footer from '../../components/Footer'
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";



const tabs = [
  { name: 'Settings', href: '/user', current: true },
  { name: 'History', href: '/user/history', current: false },
  { name: 'Dashboard', href: '/dashboard/products', current: false },
]
function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

const Profile:React.FC= ()=> {
  const [isOpen, setIsOpen] = useState(false)
  const { data: sessionData } = useSession();
  const [mod,setMod] = useState<string>();
  const router = useRouter();
  //const [userData, setUserData] = useState();
  // {
  //   name:null,
  //     userPhone: "0800000123",
  //   userAddress: "test",
  // }
  const updateu = trpc.user.updateData.useMutation();

  const {data:userData} = trpc.user.userDetail.useQuery();
  function closeModal(e:any) {
    setIsOpen(false)
    if(e?.target?.name==="save"){

      // TODO: fix this
      updateu.mutate(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        {[mod]: document.getElementById("input-form")?.value}
      )
      router.reload();
    }

  }
  function openModal(e: any) {
    console.log(e.target.id);
    setIsOpen(true)
    setMod(e.target.id);
  }
  // useEffect(() => {
  //   const {data:data} = trpc.user.userDetail.useQuery();
  //   setUserData(data);
  // },[])
  if (!sessionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold">You must be signed in to view this page</h1>
        <button className="p-2 m-2 border-2 border-gray-400 rounded-md" onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }




  return (
    <div className="bg-white">
      <Navbar />
      {/* Modal content */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Update your {mod}
                    </p>
                    <input
                      type="text"
                      name="input-form"
                      id="input-form"
                      placeholder={mod}
                      className="mt-4 p-2 border-2 border-gray-400 rounded-md"
                    />
                  </div>


                  <div className="mt-4">
                    <button
                      name={"discard"}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Discard
                    </button>
                    <button
                      name={"save"}
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ml-2"
                      onClick={closeModal}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <main>
        <div className="relative mx-auto max-w-4xl md:px-8 xl:px-0">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                {/* Tabs */}
                <div className="lg:hidden">
                  <label htmlFor="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                    defaultValue={tabs.find((tab) => tab.current)?.name  }
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <Link
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current
                              ? 'border-purple-500 text-purple-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                          )}
                        >
                          {tab.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Description list with inline editing */}
                <div className="mt-10 divide-y divide-gray-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                    <p className="max-w-2xl text-sm text-gray-500">
                      This information will be displayed publicly so be careful what you share.
                    </p>
                  </div>
                  <div className="mt-6">
                    <dl className="divide-y divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Name</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">{userData?.name}</span>
                          <span className="ml-4 flex-shrink-0">
                                  <button
                                    id={"name"}
                                    onClick={openModal}
                                    type="button"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  >
                                    Update
                                  </button>
                                </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">Photo</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span className="flex-grow">
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src={sessionData?.user?.image || '/img/avatar.svg'}
                                    alt=""
                                  />
                                </span>
                          <span className="ml-4 flex flex-shrink-0 items-start space-x-4">
                                  <button
                                    type="button"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                    onClick={openModal}
                                    id={"image"}
                                  >
                                    Update
                                  </button>
                                  {/*<span className="text-gray-300" aria-hidden="true">
                                    |
                                  </span>
                                  <button
                                    type="button"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  >
                                    Remove
                                  </button>*/}
                                </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:pt-5">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">{userData?.email}</span>

                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">{userData?.userPhone}</span>
                          <span className="ml-4 flex-shrink-0">
                                  <button
                                    id={"userPhone"}
                                    onClick={openModal}
                                    type="button"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  >
                                    Update
                                  </button>
                                </span>
                        </dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                          <span className="flex-grow">{userData?.userAddress}</span>
                          <span className="ml-4 flex-shrink-0">
                                  <button
                                    id={"userAddress"}
                                    onClick={openModal}
                                    type="button"
                                    className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                  >
                                    Update
                                  </button>
                                </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
export default Profile;