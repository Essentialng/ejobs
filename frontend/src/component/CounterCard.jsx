import React from 'react'

const CounterCard = ({value, title, Icon}) => {
  return (
    <div className='bg-orange-100 px-16 py-8 hover:bg-orange-600 hover:scale-105 hover:text-white text-orange-500 flex items-center justify-center flex-col'>
        {Icon}
        <span className="text-4xl block font-semibold">{value}</span>
        <span>{title}</span>
    </div>
  )
}

export default CounterCard