import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane,faCloud } from '@fortawesome/free-solid-svg-icons'

export default function Airplane() {

    const style = {
        one: {
            opacity: '0.2',
            fontSize: '10rem',
            translate: '0 -80%',
            animationDuration: '2.5s',
        },
        two: {
            opacity: '0.2',
            fontSize: '20rem',
            translate: '0 70%',
            animationDuration: '3s',
        },
        three: {
            opacity: '0.1',
            fontSize: '6rem',
            translate: '0 70%',
            animationDuration: '2s',
        },
        four: {
            opacity: '0.1',
            fontSize: '4rem',
            translate: '0 -290%',
        },
    }

    return (
        <div className="chatLoading absolute inset-0 h-[100%] w-[100%] z-[-1] overflow-hidden">
            <FontAwesomeIcon className='animate-swing text-[clamp(10rem,_1vw,_15rem)] absolute' icon={faPlane} />
            <FontAwesomeIcon className='animate-pass absolute' icon={faCloud} style={style.one}/>
            <FontAwesomeIcon className='animate-pass absolute' icon={faCloud} style={style.two}/>
            <FontAwesomeIcon className='animate-pass absolute' icon={faCloud} style={style.three}/>
            <FontAwesomeIcon className='animate-pass absolute' icon={faCloud} style={style.four}/>
        </div>
  )
}
