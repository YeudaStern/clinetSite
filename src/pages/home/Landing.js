import React from 'react'
import AppBar from './appBar'
import Main from './Main'
import Contact from './Contact'
import Footer from './Footer'
import OurWork from './OurWork'
import logo3 from '../../components/barside/logo3.png'

export default function Landing() {
    return (
        <div>
            <AppBar />
            <div className='home text-black' id='home'>
                {/* */}
                <div className='max-w-[800px] w-full h-screen mt-[-96px] mx-auto  flex flex-col justify-center '>
                    <div className=' text-center text-white rounded-2xl bg-gray-900 bg-opacity-60 m-3 md:m-0'  >
                        <p className=' md:pl-4 mb-2 mt-4 md:text-5xl sm:text-4xl text-xl font-bold'>Y&M</p>
                        <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4  '>עיצוב פנים | תכנון אדריכלי | שינויי דיירים</p>
                        <p className='mb-4 h-32' style={{ backgroundImage: `url(${logo3})`, backgroundRepeat: 'no-repeat', backgroundSize: '100px', backgroundPosition: 'center' }}></p>

                    </div>
                    <div className='hidden 2xl:block h-20'></div>
                </div>
            </div>
            <Main />
            <OurWork />
            <Contact />
            <Footer />
        </div>
    )
}