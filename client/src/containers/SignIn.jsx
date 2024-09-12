import React from "react"

function signIn() {
    return(
        <div className="Sign-In">
            <section className="bg-gray-50 dark:bg-gray-900">
<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign in</h1>
      <form className="signIn-form space-y-4 md:space-y-6">
        <div className="my-3">
          <label for="email-signIn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" type="text" id="email-signIn" placeholder="name@company.com" />


        </div>
        <div className="">
          <label for="password-signIn" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" id="password-signIn" placeholder="••••••••" />


         
        </div>
        <div className="my-3">
          <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 my-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Sign in</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <a href="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
                  </p>
        </div>
      </form>
    </div>
</div>
</div>  
</section>  
        </div>
    )
}

export default signIn;