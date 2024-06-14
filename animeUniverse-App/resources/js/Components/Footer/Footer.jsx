import React from 'react'

function Footer() {
    
  return (
    <>  
        <div className='bg-white p-8'>
            <div className='flex md:flex-row flex-col md:justify-evenly md:gap- gap-4 justify-center items-center'>
                <div className='w-60'>
                    <h1 className="font-extrabold text-[20px] md:text-left text-center">Anime Universe</h1>
                    <p className='md:text-justify text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, earum veniam voluptas mollitia deserunt nobis quibusdam error laborum qui vitae illo inventore dignissimos, atque natus veritatis fugiat animi beatae accusantium.</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <h2>
                        <span><a href="">Instagram</a></span>
                    </h2>

                    <h2>
                        <span><a href="">Discord</a></span>
                    </h2>
                    <h2>
                        <span><a href="">Reddit</a></span>
                    </h2>
                </div>
                <div className='w-60'>
                    <p className='md:text-justify text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dolores! Earum quia dicta accusamus ratione odit aut dignissimos laudantium sapiente, a laborum perferendis laboriosam placeat temporibus commodi est blanditiis explicabo!
                    </p>
                </div>
            </div>
            <div className='border-b border-gray-200 p-2'></div>
            <div class="p-6 text-center">
                <span>© 2024 Copyright:</span>
                <a class="font-semibold" href="#">Anime Universe</a>
            </div>
        </div>
    </>
  )
}

export default Footer