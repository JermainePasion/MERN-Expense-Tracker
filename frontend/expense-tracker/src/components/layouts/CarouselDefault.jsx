import React from 'react';
import 'flowbite'
import front1 from "../../assets/images/front1.png"
import front2 from "../../assets/images/front2.png"
import front3 from "../../assets/images/front3.png"

import Carousel from './CarouselComponents.jsx';

export function CarouselDefault() {

  let slides = [
    front1,
    front2,
    front3,
  ]
  return (
    <div className="flex justify-center items-center w-full px-4 pt-10">
      <div className="w-[90%] max-w-md min-w-[300px]">
        <Carousel slides={slides} />
      </div>
    </div>
  );
}
