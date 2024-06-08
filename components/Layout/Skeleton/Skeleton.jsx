import React from 'react'

const Skeleton = ({ width, height }) => {
  return (
    <div className={`animate-pulse my-4 border-gray-600 opacity-30 flex space-x-4 w-[100px] h-[20px] md:w-[${width}px] md:h-[${height}px]`}>
      <div className={`rounded-full bg-gray-600 w-[100px] h-[20px] md:w-[${width}px] md:h-[${height}px]`}></div>
      <div className="flex-1 space-y-6 py-1">
        <div className="h-2 bg-gray-600 rounded"></div>
        <div className="space-y-3 md:block hidden">
          <div className="grid md:grid-cols-3 md:gap-4 my-auto">
            <div className="h-2 bg-gray-600 rounded col-span-2"></div>
            <div className="h-2 bg-gray-600 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton