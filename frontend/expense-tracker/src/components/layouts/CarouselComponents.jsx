import { useState } from "react";

import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";

export default function Carousel({slides}){

    let [current, setCurrent] = useState(0);

    let previousSlide = () => {
        if (current === 0) setCurrent(slides.length-1);
        else setCurrent(current - 1);
    };

    let nextSlide = () =>{
        if (current === slides.length -1) setCurrent(0);
        else setCurrent(current + 1);
    }
 

    return (
        <div className="overflow-hidden relative">
            <div className={`flex transition ease-out duration-400`}
            
            style={{transform: `translateX(-${current *100}%)`}}>
                {slides.map((s)=> {
                    return <img src={s} className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-xl"/>
                })}
            </div>
            
            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-2 text-2xl ">
                <button onClick={previousSlide}>
                    <FaArrowCircleLeft/>
                </button>
                <button>
                    <FaArrowCircleRight onClick={nextSlide}/>
                </button>
                
            </div>
            <div className=" absolute bottom-0 py-4 flex justify-center gap-3 w-full"> 
                {slides.map((s,i)=>{
                    return(
                        <div key={"circle"+i} className={`rounded-full w-5 h-5 ${i ==current ? "bg-white" : "bg-gray-500"} `} onClick={()=>{setCurrent(i)}}>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}