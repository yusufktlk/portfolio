import React from 'react'
import projects from '../projects.json'
import { BsArrowUpRightCircle, BsGithub } from 'react-icons/bs'

function Projects() {
  return (
    <div>
        <h1 id='projects' className='text-5xl ml-4 md:ml-44 mb-24 mt-24 font-thin'>PROJECTS</h1>
        <div className='grid md:grid-cols-3 gap-y-24 md:gap-x-12 md:ml-44 mx-24 md:mx-44 mb-24'>
            {
            projects?.map((project,key) => (
                <div key={key} className='border-2 border-purple-950 border-opacity-60 rounded-xl pb-4 hover:scale-105 duration-500'>
                    <img src={project.image} className='w-[380px] h-[250px] object-contain' />
                    <h1 className='text-lg text-purple-700 font-thin ml-2 '>{project.title}</h1>
                    <p className='w-[340px] h-[100px] font-thin mt-2 ml-2'>{project.text}</p>
                    <div className='flex justify-between mt-10 items-center'>
                        <div className='flex gap-x-4'>
                        <h1 className='flex gap-x-4 ml-4'>Live Demo</h1>
                        <a href={project.live} target='_blank' rel='noreferrer'><BsArrowUpRightCircle size={24} /></a>
                        </div>
                        <div className='flex gap-x-4 mr-4'>
                        <h1 className='flex items-center gap-x-4'>Source Code</h1>
                        <a href={project.live} target='_blank' rel='noreferrer'><BsGithub size={24} /></a>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    <hr className='mx-4 md:mx-44 border-1 border-purple-950' />
    </div>
  )
}

export default Projects