import React from 'react'

function Tech() {
  return (
    <div>
        <h1 id='tech' className='text-5xl ml-4 md:ml-44 mb-16 md:mb-24 mt-16 md:mt-24 font-thin'>TECH STACK</h1>
        <div className='flex justify-center gap-x-3 md:gap-x-12 mb-20 md:mb-32'>
            <img className='hover:-translate-y-5 duration-500' src='/HTML5.png' />
            <img className='hover:-translate-y-5 duration-500' src='/CSS.png' />
            <img className='hover:-translate-y-5 duration-500' src='/TailwindCSS.png' />
            <img className='hover:-translate-y-5 duration-500' src='/Javascript.png' />
            <img className='hover:-translate-y-5 duration-500' src='/React.png' />
            <img className='hover:-translate-y-5 duration-500' src='/Figma.png' />
            <img className='hover:-translate-y-5 duration-500' src='/Github.png' />
        </div>
    </div>
  )
}

export default Tech