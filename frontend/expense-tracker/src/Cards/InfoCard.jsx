import React from 'react'

const InfoCard = ({icon, label,value, color}) => {
  return (
    <div className='flex gap-6 bg-[#6a994e] hover:bg-[#386641] hover:scale-102 transition duration-500 p-6 rounded-2xl shadow-md shadow-gray-100 border border-green-200/50 '>
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-xl drop-shadow-2xl hover:scale-115 transition duration-500`}>
            {icon}
        </div>
        <div>
            <h6 className='text-white'>{label}</h6>
            <span className='font-semibold text-white tracking-widest'>₱ {value}</span>
        </div>
    </div> 
  )
}

export default InfoCard