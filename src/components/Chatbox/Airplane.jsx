import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane,faCloud } from '@fortawesome/free-solid-svg-icons'

export default function Airplane() {

    const style = {
        cloud: {
            position: 'absolute',  
            animationName: 'pass',
            animationDuration: '2s',
            animationDirection: 'normal',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          },
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
            <FontAwesomeIcon icon={faPlane} />
            <FontAwesomeIcon icon={faCloud} style={{...style.cloud ,...style.one}}/>
            <FontAwesomeIcon icon={faCloud} style={{...style.cloud ,...style.two}}/>
            <FontAwesomeIcon icon={faCloud} style={{...style.cloud ,...style.three}}/>
            <FontAwesomeIcon icon={faCloud} style={{...style.cloud ,...style.four}}/>
        </div>
  )
}
