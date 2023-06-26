import React from 'react'
import AppBar from './appBar'
import Main from './Main'
import Contact from './Contact'
import Footer from './Footer'
import OurWork from './OurWork'
import home from './images/home.png'


export default function Landing() {
    return (
        <div>
            <AppBar />
            <div className='home text-black' id='home'>
            {/*  style={{ backgroundImage: `url(${home})`}} */}
                <div className='max-w-[800px] w-full h-screen mt-[-96px] mx-auto  flex flex-col justify-center '>
                    <div className='mt-[260px] text-center text-white rounded-2xl bg-gray-900 bg-opacity-60'>
                        <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4  '>עיצוב פנים | תכנון אדריכלי | שינויי דיירים</p>
                        <p className='md:text-2xl text-xl font-bold md:pl-4 mb-4 '>אצלנו תרגישו בבית </p>
                        <p className='md:text-2xl text-xl font-bold mb-4 '>M&Y</p>
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