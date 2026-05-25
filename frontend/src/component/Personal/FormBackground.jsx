import React from 'react'
import Grainient from '../ReactBitz/Grainient';

function FormBackground() {
    return (
        <div id='background' className='col-span-7 relative overflow-hidden hidden md:flex'>
            <Grainient
                color1="#6911A3"
                color3="#7D257E"
                color2="#080F27"
                timeSpeed={0.25}
                colorBalance={0}
                warpStrength={1}
                warpFrequency={5}
                warpSpeed={2}
                warpAmplitude={50}
                blendAngle={0}
                blendSoftness={0.05}
                rotationAmount={500}
                noiseScale={2}
                grainAmount={0.1}
                grainScale={2}
                grainAnimated={false}
                contrast={1.5}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.9}

                className='absolute'
            />
            <div className='relative border-red-500 z-10 h-full w-full flex flex-col capitalize justify-end p-10 gap-4 '>
                <h3 className='text-medium text-3xl font-medium w-1/4'>Push <span className='text-light font-semibold'>your limit</span> with us</h3>
                <span className='text-light w-1/2 text-sm'>train smarter, get stronger, and push your limit with expert coaching.</span>
            </div>
        </div>
    )
}

export default FormBackground
