import React from 'react'
import { Link } from 'react-scroll'

function Navbar() {
  return (
    <div className='flex justify-between mx-4 md:mx-44 text-xl font-thin mt-4 md:mt-8'>
        <h1 className='md:text-2xl'>Frontend Dev.</h1>
        <div className='flex gap-x-6 md:gap-x-32 '>
            <Link to="resume" spy={true} smooth={true} offset={0} duration={700} className="transition duration-500 hover:scale-125 cursor-pointer" >Resume</Link>
            <Link to="projects" spy={true} smooth={true} offset={0} duration={700} className="transition duration-500 hover:scale-125 cursor-pointer">Projects</Link>
            <Link to="tech" spy={true} smooth={true} offset={0} duration={700} className="transition duration-500 hover:scale-125 cursor-pointer">Tech Stack</Link>
        </div>
    </div>
  )
}

export default Navbar