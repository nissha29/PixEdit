import React from 'react'

function Video() {
    return (
        <div className='mt-40 flex flex-col justify-center items-center mb-32'>
            <div className='text-5xl text-foreground'>
                Here’s where the <span className='text-white bg-accent-dark px-2 py-0.5'>MAGIC</span> unfolds:
            </div>
            <video
                src='/apex.mp4'
                controls
                width={2000}
                height={2000}
                className="rounded-2xl border border-double border-accent-light p-3 mt-16 w-9xl h-1/2"
            />
        </div>
    )
}

export default Video