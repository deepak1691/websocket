import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Signup from './Signup'



export default function UserPage() {
  return (
    <div className='flex justify-center items-center h-screen test-style'>
    <div className='card bg-base-100 w-100 h-85 shadow-sm'>

     <Signup/>

    </div>
    </div>
  )
}
