import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
// import the split text plugin
import { SplitText } from 'gsap/all'
import { useRef } from 'react'

import { useMediaQuery } from 'react-responsive'
const Hero = () => {

    // create a ref for video so you can access it
    const videoRef = useRef()

    // returns boolean
    const isMobile = useMediaQuery({maxWidth: 767})

    useGSAP(()=>{
        //  split the title into chars and words
        const heroSplit = new SplitText('.title', {type: 'chars, words'})
        // split the paragraph line by line
        const paragraphSplit = new SplitText('.subtitle', {type: 'lines'})

        // apply gradient effects for each letter in title
        heroSplit.chars.forEach((char)=> char.classList.add('text-gradient'))

        // animate eact char
        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            // apply stagger so each chars animate
            stagger: 0.06
        })

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 1
        })

        // craete timeline trigger by scroll
        gsap.timeline({
            scrollTrigger:{
                trigger: '#hero',
                // start when top of hero reach top viewport
                // ends when bottom of hero reach top of view port
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
            })
        // moves the leaf vertically when scroll
        .to('.right-leaf', {y: 200}, 0)
        .to('.left-leaf', {y: -200}, 0)


        // create a time line for video
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'video',
                start: isMobile ? 'top 50%' : 'center 60%',
                end: isMobile ? '120% top' : 'bottom top',
                scrub: true,
                pin: true
            }
        })

        // once the browser loads the metadata it wil run
        videoRef.current.onloadedmetadata = ()=>{
            tl.to(videoRef.current, {
                // set the video time kung anong duration na sa scroll
                currentTime: videoRef.current.duration
            })
        }


    },[])
  return (
   <>
    <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>

        <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />

        <div className="body">
            <div className="content">
                <div className="space-y-5 hidden md:block">
                    <p>Cool. Crisp Classic.</p>
                    <p className="subtitle">
                        Sip the Spirit <br /> of Summer
                    </p>
                </div>
                <div className="view-cocktails">
                    <p className="subtitle">
                        Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes — designed to delight your senses. 
                    </p>
                    <a href="#cocktails">View Cocktails</a>
                </div>
            </div>
        </div>
    </section>

    <div className="video absolute inset-0">
        <video 
            ref={videoRef}
            src="/videos/output.mp4" muted playsInline preload='auto'></video>
    </div>
   </>
  )
}

export default Hero