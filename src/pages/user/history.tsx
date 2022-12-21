import  Footer from '../../components/Footer'
import Navbar from "../../components/Navbar";
import Link from "next/link";
import {trpc} from "../../utils/trpc";
const orders = [
  {
    orderId: 'WU88191111',
    date: 'January 22, 2021',
    datetime: '2021-01-22',
    invoiceHref: '#',
    total: '$238.00',
    detail: [
      {
        id: 1,
        name: 'Machined Pen and Pencil Set',
        href: '#',
        price: '$70.00',
        status: 'Delivered Jan 25, 2021',
        image: 'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
        imageAlt: 'Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.',
      },
    ],
  },
]
const tabs = [
  { name: 'Settings', href: '/user', current: false },
  { name: 'History', href: '/user/history', current: true },
  { name: 'Dashboard', href: '/dashboard', current: false },
]
function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function History() {
  const {data: history} = trpc.order.getHistory.useQuery()
  console.log(history)

  return (
    <div className="bg-white">
      <Navbar />

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
                <div className="divide-y divide-gray-200">
                  <div className="bg-white">
                    <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24">
                      <div className="max-w-xl">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                        <p className="mt-2 text-sm text-gray-500">
                          Check the status of recent orders, manage returns, and download invoices.
                        </p>
                      </div>

                      <div className="mt-16">
                        <h2 className="sr-only">Recent orders</h2>

                        <div className="space-y-20">
                          {history?.map((order) => (
                            <div key={order.orderId}>
                              <h3 className="sr-only">
                                Order placed on <time >{order.time.toLocaleDateString("en-US")}</time>
                              </h3>

                              <div className="rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                  <div className="flex justify-between sm:block">
                                    <dt className="font-medium text-gray-900">Date placed</dt>
                                    <dd className="sm:mt-1">
                                      <time >{order.time.toLocaleDateString("en-US")}</time>
                                    </dd>
                                  </div>
                                  <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                    <dt className="font-medium text-gray-900">Order number</dt>
                                    <dd className="sm:mt-1">{order.orderId}</dd>
                                  </div>
                                  <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                    <dt>Total amount</dt>
                                    <dd className="sm:mt-1">{order.total}</dd>
                                  </div>
                                </dl>
                                <a
                                  href={order.invoiceHref}
                                  className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                                >
                                  View Invoice
                                  <span className="sr-only">for order {order.orderId}</span>
                                </a>
                              </div>

                              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                <caption className="sr-only">Products</caption>
                                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                <tr>
                                  <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                    Product
                                  </th>
                                  <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                    Price
                                  </th>
                                  <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                    Status
                                  </th>
                                  <th scope="col" className="w-0 py-3 text-right font-normal">
                                    Info
                                  </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                { // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-ignore
                                  order.detail.map((product) => (
                                  <tr key={product.id}>
                                    <td className="py-6 pr-8">
                                      <div className="flex items-center">
                                        <img
                                          src={product.image}
                                          alt={product.name}
                                          className="mr-6 h-16 w-16 rounded object-cover object-center"
                                        />
                                        <div>
                                          <div className="font-medium text-gray-900">{product.name}</div>
                                          <div className="mt-1 sm:hidden">{product.price}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                                    <td className="hidden py-6 pr-8 sm:table-cell">{product.status}</td>
                                    <td className="whitespace-nowrap py-6 text-right font-medium">
                                      <a href={product.href} className="text-indigo-600">
                                        View<span className="hidden lg:inline">Product</span>
                                        <span className="sr-only">, {product.name}</span>
                                      </a>
                                    </td>
                                  </tr>
                                ))}
                                </tbody>
                              </table>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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

