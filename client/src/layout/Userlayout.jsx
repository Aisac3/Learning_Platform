import React from 'react'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'
import { Outlet } from 'react-router'


const Userlayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <main className="flex-grow px-3 md:px-6 lg:px-8 py-4">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Userlayout
