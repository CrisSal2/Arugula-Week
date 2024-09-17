import React from 'react'

function ErrorPage() {
  return (
    <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="gloock-regular mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-950 dark:text-primary-500">404</h1>
            <p class="gloock-regular mb-4 text-3xl tracking-tight font-bold text-green-900 md:text-4xl dark:text-white">Something's missing.</p>
            <p class="montserrat mb-4 text-md font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <a href="/" class="gloock-regular inline-flex text-green-900 bg-amber-100 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
        </div>   
    </div>
</section>
  )
}

export default ErrorPage