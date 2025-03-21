import React from 'react'
import Hero from './Hero'
import Footer from './Footer'
import Header from './Header'

export default function Left() {
  return (
    <div className='bg-stone-100 '>
      {/* <Header/> */}
      <div className='flex-fl overflow-y-auto ' style={{maxHeight:"calc(100vh - 11vh )",minHeight:"calc(100vh - 11vh)"}}>
        <Hero/>
        </div>
        <Footer/>
    </div>

  )
}
