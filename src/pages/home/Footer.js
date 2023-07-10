import React from 'react'
import { FaFacebookSquare, FaGithubSquare, FaInstagramSquare, FaWhatsappSquare } from 'react-icons/fa';
import { RiGooglePlayFill, RiLinkedinBoxFill, RiTelegramLine, RiTwitterFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCopyrightCircle } from "react-icons/ai";


export default function Footer() {
    return (
        <div className=' bg-black mx-auto text-center'>
            <h1 className='md:text-4xl sm:text-3xl text-xl  py-6 text-slate-300 ' > בקרו באתר</h1>
            <p className='text-white mx-auto px-2'>בואו לבקר אותנו ברשתות החברתיות, אנו פעילים בפלטפורמות השונות ומפרסמים רבים מהפרויקטים שלנו, בהם תוכלו להתרשם ואולי להזמין עיצוב לדירה שלכם עוד היום<br />אנו מקווים שהתרשמתם וספרו לחברים שלכם<br />נהיה בקשר </p>
            <div className='flex flex-wrap px-6 md:w-[500px] my-4 mx-auto'>
                <FaFacebookSquare className='mx-auto  cursor-pointer text-blue-700' size={30} />
                <FaInstagramSquare className='mx-auto  cursor-pointer insta w-7 h-7 rounded-md' size={30} />
                <FaGithubSquare className='mx-auto  cursor-pointer text-white ' size={30} />
                <FaWhatsappSquare className='mx-auto  cursor-pointer text-[#00bf9a]' size={30} />
                <FcGoogle className='mx-auto  cursor-pointer text-[#00bf9a]' size={30} />
                <RiTelegramLine className='mx-auto  cursor-pointer text-white bg-[#41AAE3] rounded-lg p-1' size={30} />
                <RiLinkedinBoxFill className='mx-auto  cursor-pointer text-blue-600 ' size={30} />
                <RiGooglePlayFill className='mx-auto  text-white cursor-pointer rounded-lg p-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500' size={30} />
                <RiTwitterFill className='mx-auto  cursor-pointer text-white bg-blue-500 rounded-lg p-1' size={30} />

            </div>
            <div className=' text-white'>נבנה ועוצב ע"י <br/><strong className=' text-amber-500'>M&Y</strong> </div>
            <p className=' text-white'>כל הזכויות שמורות </p>
            <div className='p-2'><AiOutlineCopyrightCircle className='mx-auto text-slate-300 mb-3'/></div>
      </div>
)
}