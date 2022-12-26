import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { trpc } from "../utils/trpc";
const statusStyles = ['bg-gray-100 text-gray-800','bg-green-100 text-green-800','bg-yellow-100 text-yellow-800',]
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductTable() {
  const { data: products } = trpc.product.getAll.useQuery();
  const updateProduct = trpc.product.update.useMutation();
  const createProduct = trpc.product.create.useMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [mod,setMod] = useState("");
  function closeModal(e:any) {
    setIsOpen(false)
    if(e?.target?.name==="save"){
      if (mod.split("-")[1]==="new"){
        createProduct.mutate({
          productImage:String((document.getElementById("image-url") as HTMLInputElement).value),
          productDescription:String((document.getElementById("product-description") as HTMLInputElement).value),
          productName:String((document.getElementById("product-name")as HTMLInputElement).value),
          productPrice:Number((document.getElementById("product-price")as HTMLInputElement).value),
          productCategory:Number((document.getElementById("category")as HTMLInputElement).value),
          productStatus:Number((document.getElementById("status")as HTMLInputElement).value)
        })
      }else{
        updateProduct.mutate(
          {
            id:Number(mod.split("-")[1]),
            productImage:String((document.getElementById("image-url") as HTMLInputElement).value),
            productDescription:String((document.getElementById("product-description") as HTMLInputElement).value),
            productName:String((document.getElementById("product-name")as HTMLInputElement).value),
            productPrice:Number((document.getElementById("product-price")as HTMLInputElement).value),
            productCategory:Number((document.getElementById("category")as HTMLInputElement).value),
            productStatus:Number((document.getElementById("status")as HTMLInputElement).value)
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
                  <ProductDetail pid={Number(mod.split("-")[1]!=="new"?mod.split("-")[1]:"0")} />


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
          <h1 className="text-xl font-semibold text-gray-900">Add or Update product</h1>
          <p className="mt-2 text-sm text-gray-700">
            Add a new product to your store. You can add a product manually or import products from a CSV.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={openModal}
            name={"product-new"}
            id={"product-new"}
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Product
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
                    Product Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
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
                {products?.map((product, productIdx) => (
                  <tr key={Number(product.id)} className={productIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {Number(product.id)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.productName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.productPrice}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.productCategory}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={classNames(
                          statusStyles[product?.productStatus]??"",
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                        )}
                      >
                                  {product.productStatus?"active":"inactive"}
                                </span>

                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{String(product.productCreated?.toLocaleDateString("en-US"))}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        id={`product-${product.id}`}
                        onClick={openModal}
                        type="button"
                        className="rounded-md bg-white font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      {/*<a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {product.name}</span>
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
const ProductDetail: React.FC<{ pid:number }> = ({pid}) => {
  const {data:productData }= trpc.product.getOne.useQuery(pid?pid:2);
  const {data:categoryData }= trpc.category.getAll.useQuery();
  const [imageURL,setImageURL] = useState(productData?.productImage??"/img/placeholders/592x592.png");
  useEffect(
    () => {
      setImageURL(productData?.productImage??"/img/placeholders/592x592.png");
    }
  )
  return (
    <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6">
      <div className="sm:col-span-6">
        <h2 className="text-xl font-medium text-blue-gray-900">Product Information</h2>
        {/*<p className="mt-1 text-sm text-blue-gray-500">
                        Edit the product information.
                      </p>*/}
      </div>
      <div className="sm:col-span-6">
        <img
          src={imageURL}
          alt={"product"}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="product-name" className="block text-sm font-medium text-blue-gray-900">
          Product Name
        </label>
        <input
          type="text"
          name="product-name"
          id="product-name"
          defaultValue={productData?.productName??""}
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="image-url" className="block text-sm font-medium text-blue-gray-900">
          Image URL
        </label>
        <input
          onChange={(e) => setImageURL(e.target.value)}
          defaultValue={productData?.productImage??"/img/placeholders/592x592.png"}
          type="text"
          name="image-url"
          id="image-url"
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="product-price" className="block text-sm font-medium text-blue-gray-900">
          Price
        </label>
        <input
          defaultValue={productData?.productPrice??""}
          type="text"
          name="product-price"
          id="product-price"
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div className="sm:col-span-3">
        <label htmlFor="category" className="block text-sm font-medium text-blue-gray-900">
          Category
        </label>
        <select
          //value={productData?.productCategory}
          id="category"
          name="category"
          autoComplete="category-name"
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {categoryData?.map((category) => (
            <option key={category.id} value={category.id} selected={productData?.productCategory===category.id}>{category.productCategoryName}</option>
          ))}
          {/*<option value={1} >Woman</option>
          <option value={2}>Man</option>
          <option value={3} >Bag</option>*/}
        </select>
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
          <option value={0} selected={productData?.productStatus===0}>inactive</option>
          <option value={1} selected={productData?.productStatus===1}>active</option>
        </select>
      </div>
      <div className="sm:col-span-6">
        <label htmlFor="product-description" className="block text-sm font-medium text-blue-gray-900">
          Description
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="product-description"
            id="product-description"
            defaultValue={productData?.productDescription??"<p></p>"}
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