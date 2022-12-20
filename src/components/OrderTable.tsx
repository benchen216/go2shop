import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { trpc } from "../utils/trpc";

export default function OrderTable() {
  const { data: orders } = trpc.order.getAll.useQuery();
  const updateOrder = trpc.order.update.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [mod,setMod] = useState("");
  function closeModal(e:any) {
    setIsOpen(false)
    if(e?.target?.name==="save"){
      if (mod.split("-")[1]==="new"){
      }else{
        updateOrder.mutate(
          {
            id:Number(mod.split("-")[1]),
            status:Number((document.getElementById("status")as HTMLInputElement).value)
          }
        );
      }
      window.location.reload();
    }
  }
  async function openModal(e: any) {
    console.log(e.target.id);
    setIsOpen(true)
    setMod(e.target.id);
  }
  return (
    <div className="">
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
                  <OrderDetail pid={Number(mod.split("-")[1]!=="new"?mod.split("-")[1]:"0")} />


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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Add or Update Order</h1>
          <p className="mt-2 text-sm text-gray-700">
            Add a new Order to your store. You can add a Order manually or import Orders from a CSV.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={openModal}
            name={"Order-new"}
            id={"Order-new"}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Order
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Id
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Order Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {orders?.map((Order, OrderIdx) => (
                  <tr key={Number(Order.orderId)} className={OrderIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {Number(Order.orderId)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Order.name}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Order.status?"active":"inactive"}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Order.total}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{String(Order.time?.toLocaleDateString("en-US"))}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        id={`Order-${Order.id}`}
                        onClick={openModal}
                        type="button"
                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      {/*<a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {Order.name}</span>
                      </a>*/}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const OrderDetail: React.FC<{ pid:number }> = ({pid}) => {
  const {data:OrderData }= trpc.order.getOne.useQuery(pid?pid:2);
  //const [imageURL,setImageURL] = useState(OrderData?.productOrderImg??"/img/placeholders/592x592.png");
  return (
    <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
      <div className="sm:col-span-6">
        <h2 className="text-xl font-medium text-blue-gray-900">Order Information</h2>
        {/*<p className="mt-1 text-sm text-blue-gray-500">
                        Edit the Order information.
                      </p>*/}
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="Order-name" className="block text-sm font-medium text-blue-gray-900">
          Order Name
        </label>
        <input
          type="text"
          name="Order-name"
          id="Order-name"
          defaultValue={OrderData?.name??""}
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="status" className="block text-sm font-medium text-blue-gray-900">
          status
        </label>
        <select
          id="status"
          name="status"
          autoComplete="status"
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value={0} selected={OrderData?.status===0}>inactive</option>
          <option value={1} selected={OrderData?.status===1}>active</option>
        </select>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="Order-address" className="block text-sm font-medium text-blue-gray-900">
          Order Address
        </label>
        <input
          type="text"
          name="Order-address"
          id="Order-address"
          defaultValue={OrderData?.address??""}
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="order-phone" className="block text-sm font-medium text-blue-gray-900">
          Order Phone
        </label>
        <input
          type="text"
          name="order-phone"
          id="order-phone"
          defaultValue={OrderData?.phone??""}
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="order-payment" className="block text-sm font-medium text-blue-gray-900">
          Order Payment
        </label>
        <input
          type="text"
          name="order-payment"
          id="order-payment"
          defaultValue={OrderData?.payment??""}
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="order-email" className="block text-sm font-medium text-blue-gray-900">
          Order Email
        </label>
        <input
          type="text"
          name="order-email"
          id="order-email"
          defaultValue={OrderData?.email??""}
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );
}