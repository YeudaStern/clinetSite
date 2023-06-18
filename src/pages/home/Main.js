import React from 'react'
import green from './images/green.jpg'


export default function Main() {
    return (
        <>         
            <div className='w-full px-8 my-3 ' id='about'>
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                    <img className='md:w-[500px] h-[87%] mx-auto my-4 shadow-md shadow-black rounded-2xl' src={green} alt='back' />
                    <div className='flex flex-col justify-center  md:ml-5 shadow-inner p-4 md:rounded-r-2xl rounded-b-2xl md:rounded-b-none md:rounded-br-2xl h-[87%] mt-[24px] '>
                        <h1 className='md:text-4xl sm:text-3xl text-xl font-bold py-2 text-slate-400'>מי אנחנו ?</h1>
                        <p className='font-bold'>כדי לסמוך על מישהו, צריך להכיר אותו</p>
                        <p className='text-slate-400'>לקחנו על עצמנו להנגיש ולהקל את כל חווית עיצוב ושיפוץ הבית או כל שינוי שתרצו לעשות בביתכם על ידי בניית ממשק חדשני ומשוכלל המקל על כל התהליך ומשנה משמעותית לטובה את כל שיפוץ הדירה, ומסיר את כל הסבל הבירוקרטי שהיה כרוך עד היום</p>
                    </div>
                </div>

            </div>
   </>
)
}