import React from 'react'
import { Button } from "flowbite-react";

function Banner() {
  return (
    <>
        <div className='bg-blue-400 m-20 rounded-2xl'>
            <div className='flex md:flex-row flex-col justify-between p-5 items-center'>
                <div className='flex flex-col md:items-start items-center gap-8'>
                    <div className='w-[95%] flex flex-col gap-2'>
                        <h1 className='text-[20px] md:text-left text-center font-extrabold'>Website kami berkontribusi dengan MangaDex</h1>
                        <p className='md:text-justify text-center'>
                            Pusat manga terlengkap yang bekerja sama dengan menggunakan API dari MangaDex
                        </p>
                    </div>
                    <div>
                        <a href="https://mangadex.org/" className='md:mx-0 mx-[120px]'><Button color="dark">Go To MangaDex</Button></a>
                    </div>
                </div>
                <img src="https://pngfre.com/wp-content/uploads/anime-girl-29-1.png" alt="banner-pic" className='w-40 h-auto' />
            </div>
        </div>
    </>
  )
}

export default Banner