import React from 'react'
import {BsLinkedin, BsGithub} from 'react-icons/bs'
import {AiFillTwitterCircle} from 'react-icons/ai'

function Footer() {
  return (
    <div className='bg-purple-950 opacity-50 p-3 font-thin text-[15px] flex items-center '>
        <h1 className='absolute'>Yusuf Kıtlık</h1>
        <div className='flex m-auto gap-x-8 items-center'>
            <a href='https://www.linkedin.com/in/yusuf-kitlik/' target='_blank' rel='noreferrer'><BsLinkedin  size={24}/></a>
            <a href='https://github.com/yusufktlk' target='_blank' rel='noreferrer'><BsGithub size={24}  /></a>
            <a href='https://twitter.com/YKtlk' target='_blank' rel='noreferrer'><AiFillTwitterCircle size={28}/></a>
        </div>
    </div>
  )
}

export default Footer