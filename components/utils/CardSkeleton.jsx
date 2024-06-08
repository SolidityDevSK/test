import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CardSkeleton = () => {
  return (
    <div className='flex my-4'>
        <div className='flex w-fit mx-auto'>
        <div className='my-auto'>
            <Skeleton width={200} height={120}/>
        </div>
        <div className='mx-20'>
            <Skeleton count={3} width={700} height={50} style={{marginBottom:".6rem", borderRadius:"30px"}}/>
        </div>
        </div>
    </div>
  )
}

export default CardSkeleton