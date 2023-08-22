import React from 'react'
import {BsLinkedin,BsGithub} from 'react-icons/bs'
import {FiTwitter} from 'react-icons/fi'
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Tech from './Tech';


function Main() {
  return (
    <>
    <div className='flex flex-col md:mb-64 mt-24 md:mt-36 mx-4 md:mx-44'>
      <h5 className='font-thin tracking-widest'>Hey, I'm</h5>
      <h1 className='text-[100px] text-transparent bg-clip-text bg-gradient-to-r from-purple-950 via-[#6964DE] to-purple-950 opacity-80'>Yusuf Kıtlık</h1>
  
      <p className='md:text-lg font-thin tracking-widest'>I'm a Frontend Developer based in Antalya, Turkey and also a Management Information Systems student in Antalya Belek University. As a self-taught developer, I love coding ReactJS and Tailwind CSS.</p>

      <div className="flex gap-x-3 md:gap-x-24 mt-24 tracking-wider">
          <div className="rounded-md bg-gradient-to-r from-purple-950 via-[#6964DE] to-purple-950 p-1 hover:scale-105 duration-500">
            <a href='https://www.linkedin.com/in/yusuf-kitlik/' target='_blank' rel='noreferrer' className="flex h-[50px] w-[100px] md:w-[150px] items-center justify-center gap-x-3 bg-black back cursor-pointer">
              <BsLinkedin size={24}/>Linkedin
            </a>
          </div>
          <div className="rounded-md bg-gradient-to-r from-purple-950 via-[#6964DE] to-purple-950 p-1 hover:scale-105 duration-500">
            <a href='https://github.com/yusufktlk' target='_blank' rel='noreferrer' className="flex h-[50px] md:h-[50px] w-[100px] md:w-[150px] items-center justify-center gap-x-3 bg-black back cursor-pointer">
              <BsGithub size={24}  />Github
            </a>
          </div>
          <div className="rounded-md bg-gradient-to-r from-purple-950 via-[#6964DE] to-purple-950  p-1 hover:scale-105 duration-500">
            <a href='https://twitter.com/YKtlk' target='_blank' rel='noreferrer' className="flex h-[50px] md:h-[50px] w-[100px] md:w-[150px] items-center justify-center gap-x-3 bg-black back cursor-pointer">
              <FiTwitter size={24}/>Twitter
            </a>
          </div>
      </div>
    </div>

    <Experience />

    <Education />

    <Projects />

    <Tech />
    </>
  )
}

export default Main