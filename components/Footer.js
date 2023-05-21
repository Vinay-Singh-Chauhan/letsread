import Link from 'next/link'
import React from 'react'
const Footer = () => {
  return (
    <div>
        <footer className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <Link href={'/'}><span className="ml-3 text-xl text-gray-500">LetsRead</span></Link>
      </div>
      <p className="mt-2 text-sm text-gray-500">A reader lives a thousand lives before he dies </p>
    </div>
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Categories</h2>
        <nav className="list-none mb-10">
          
          <li><Link className="text-gray-600 hover:text-gray-800" href={"/fictions"} >Fictions</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/biographies"} >Biographies</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/journals"} >Journals</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/essays"} >Essays</Link></li>
          
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Social Media Handles</h2>
        <nav className="list-none mb-10">
        <li><Link className="text-gray-600 hover:text-gray-800" href={"/fictions"} >Facebook</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/biographies"} >Instagram</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/journals"} >Twitter</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/essays"} >Snapchat</Link></li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Legal</h2>
        <nav className="list-none mb-10">
        <li><Link className="text-gray-600 hover:text-gray-800" href={"/fictions"} >Terms and Conditions</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/biographies"} >Rules</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/journals"} >Service Charges</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/essays"} >Terms of Use</Link></li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Contribution</h2>
        <nav className="list-none mb-10">
        <li><Link className="text-gray-600 hover:text-gray-800" href={"/fictions"} >Contribute Material</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/biographies"} >Financial Contribution</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/journals"} >Terms of Contribution</Link></li>
      <li><Link className="text-gray-600 hover:text-gray-800" href={"/essays"} >Our Contrributors</Link></li>
        </nav>
      </div>
    </div>
  </div>
  
</footer>
    </div>
  )
}

export default Footer