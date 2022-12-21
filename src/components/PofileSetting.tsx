import React from "react";

const ProfileSetting= () => {
  return (
    <>
      <div className="sm:col-span-6">
        <label htmlFor="username" className="block text-sm font-medium text-blue-gray-900">
          Username
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-blue-gray-300 bg-blue-gray-50 px-3 text-blue-gray-500 sm:text-sm">
                              workcation.com/
                            </span>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            defaultValue="lisamarie"
            className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-blue-gray-300 text-blue-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="photo" className="block text-sm font-medium text-blue-gray-900">
          Photo
        </label>
        <div className="mt-1 flex items-center">
          <img
            className="inline-block h-12 w-12 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
            alt=""
          />
          <div className="ml-4 flex">
            <div className="relative flex cursor-pointer items-center rounded-md border border-blue-gray-300 bg-white py-2 px-3 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 hover:bg-blue-gray-50">
              <label
                htmlFor="user-photo"
                className="pointer-events-none relative text-sm font-medium text-blue-gray-900"
              >
                <span>Change</span>
                <span className="sr-only"> user photo</span>
              </label>
              <input
                id="user-photo"
                name="user-photo"
                type="file"
                className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
              />
            </div>
            <button
              type="button"
              className="ml-3 rounded-md border border-transparent bg-transparent py-2 px-3 text-sm font-medium text-blue-gray-900 hover:text-blue-gray-700 focus:border-blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-gray-50"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="description" className="block text-sm font-medium text-blue-gray-900">
          Description
        </label>
        <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={4}
                              className="block w-full rounded-md border-blue-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              defaultValue={''}
                            />
        </div>
        <p className="mt-3 text-sm text-blue-gray-500">
          Brief description for your profile. URLs are hyperlinked.
        </p>
      </div>

      <div className="sm:col-span-6">
        <label htmlFor="url" className="block text-sm font-medium text-blue-gray-900">
          URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          className="mt-1 block w-full rounded-md border-blue-gray-300 text-blue-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
    </>)
}
export default ProfileSetting;