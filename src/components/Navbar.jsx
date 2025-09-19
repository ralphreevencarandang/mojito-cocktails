import React from 'react'
import { navLinks } from '../constants'
import { useGSAP } from "@gsap/react"
import gsap from "gsap"


const Navbar = () => {
    
  useGSAP(()=>{
    // build a timeline based on scroll trigger
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'nav',
        // controls when the animation starts and end
        // 'nav position  viewport position'
        //starts when the bottom of the navbar reaches the top of the viweport 
        start: 'bottom top',
        
      }
    })

    navTween.fromTo(
      'nav',
      {
        backgroundColor: 'transparent'
      },
      {
        backgroundColor: '#00000050',
        backgroundFilter: 'blur(10px)',
        duration: 1,
        ease: 'power1.inOut'
      }
    )
  })
  return (
    <nav>
        <div>
            <a href="#home" className='flex items-center gap-2'>
                <img src="/images/logo.png" alt="logo" />
                <p>Velvet Pour</p>
            </a>


            <ul>
                {navLinks.map((link)=>
                    <li key={link.id}>           
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                )}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar