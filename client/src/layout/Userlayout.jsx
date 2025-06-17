import React from 'react'
import Header from '../components/user/Header'
import { Outlet } from 'react-router'

const Userlayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Userlayout
