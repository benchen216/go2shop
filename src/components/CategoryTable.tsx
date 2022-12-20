import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { trpc } from "../utils/trpc";

export default function CategoryTable() {
  const { data: categories } = trpc.category.getAll.useQuery();
  const updateCategory = trpc.category.update.useMutation();
  const createCategory = trpc.category.create.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [mod,setMod] = useState("");
  function closeModal(e:any) {
    setIsOpen(false)
    if(e?.target?.name==="save"){
      if (mod.split("-")[1]==="new"){
        createCategory.mutate({
          categoryImage:String((document.getElementById("image-url") as HTMLInputElement).value),
          categoryDescription:String((document.getElementById("category-description") as HTMLInputElement).value),
          categoryName:String((document.getElementById("category-name")as HTMLInputElement).value),
          categoryStatus:Number((document.getElementById("status")as HTMLInputElement).value)
        })
      }else{
        updateCategory.mutate(
          {
            id:Number(mod.split("-")[1]),
            categoryImage:String((document.getElementById("image-url") as HTMLInputElement).value),
            categoryDescription:String((document.getElementById("category-description") as HTMLInputElement).value),
            categoryName:String((document.getElementById("category-name")as HTMLInputElement).value),
            categoryStatus:Number((document.getElementById("status")as HTMLInputElement).value)
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
                  <CategoryDetail pid={Number(mod.split("-")[1]!=="new"?mod.split("-")[1]:"0")} />


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
          <h1 className="text-xl font-semibold text-gray-900">Add or Update category</h1>
          <p className="mt-2 text-sm text-gray-700">
            Add a new category to your store. You can add a category manually or import categorys from a CSV.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={openModal}
            name={"category-new"}
            id={"category-new"}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add category
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
                    category Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {categories?.map((category, categoryIdx) => (
                  <tr key={Number(category.id)} className={categoryIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {Number(category.id)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.productCategoryName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.productCategoryStat?"active":"inactive"}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        id={`category-${category.id}`}
                        onClick={openModal}
                        type="button"
                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      {/*<a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {category.name}</span>
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
const CategoryDetail: React.FC<{ pid:number }> = ({pid}) => {
  const {data:categoryData }= trpc.category.getOne.useQuery(pid?pid:2);
  const [imageURL,setImageURL] = useState(categoryData?.productCategoryImg??"/img/placeholders/592x592.png");
  useEffect(
    () => {
      setImageURL(categoryData?.productCategoryImg??"/img/placeholders/592x592.png");
    }
  )
  return (
    <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
      <div className="sm:col-span-6">
        <h2 className="text-xl font-medium text-blue-gray-900">Category Information</h2>
        {/*<p className="mt-1 text-sm text-blue-gray-500">
                        Edit the category information.
                      </p>*/}
      </div>
      <div className="sm:col-span-6">
        <img
          src={imageURL}
          alt={"category"}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="category-name" className="block text-sm font-medium text-blue-gray-900">
          category Name
        </label>
        <input
          type="text"
          name="category-name"
          id="category-name"
          defaultValue={categoryData?.productCategoryName??""}
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="image-url" className="block text-sm font-medium text-blue-gray-900">
          Image URL
        </label>
        <input
          onChange={(e) => setImageURL(e.target.value)}
          defaultValue={categoryData?.productCategoryImg??"/img/placeholders/592x592.png"}
          type="text"
          name="image-url"
          id="image-url"
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
          <option value={0} selected={categoryData?.productCategoryStat===0}>inactive</option>
          <option value={1} selected={categoryData?.productCategoryStat===1}>active</option>
        </select>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="category-description" className="block text-sm font-medium text-blue-gray-900">
          Description
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="category-description"
            id="category-description"
            defaultValue={categoryData?.productCategoryDesc??""}
            className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          {/*<textarea
                              id="description"
                              name="description"
                              rows={4}
                              className="block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              //defaultValue={'<p></p>'}
                              value={'<p></p>'}
                            />*/}
        </div>
      </div>

    </div>
  );
}