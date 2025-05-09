import React from 'react'
import card2 from '../../assets/images/card2.png'
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { CarouselDefault } from './CarouselDefault';

function AuthLayout({children}) {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'> 
        {children}
        </div>

   
      <div class="background" className='hidden md:block w-[40vw] h-screen bg-[#a7c957] bg-auth-bg-img bg-cover bg-no-repeat bg-center 
      overflow-hidden p-8 relative '>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
        <span class="ball"></span>
          <div className='w-[60%] m-auto'>
            <CarouselDefault/>
          </div>   
        </div>
    </div>
  )
}

export default AuthLayout;

