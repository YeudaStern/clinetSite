import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function Contact() {



    return (
        <div className='md:px-36 contact px-10 pb-20 pt-20' id='contact'>
            <Row className='mb-5 '>
                <Col lg='8'>
                    <h1 className='font-bold md:text-7xl text-3xl md:mb-4 text-gray-500 border-b'>שמרו על קשר</h1>
                </Col>
            </Row>
            <Row className='rounded-lg'>
                <Col lg='5' className=' mb-5'>
                    <div className='text-black text-xl pb-2'>אנחנו מאמינים שהכל  מתחיל בחיוך ושירות</div>
                    <address>
                        <div className='font-bold text-blue-700 ' ><p className='text-black'>אימייל :</p>Exemple@gmail.com</div>
                        <br />
                        <p>
                            <div className='font-bold text-blue-700'><p className='text-black'>טלפון :</p> 97252-8857298+</div>
                        </p>
                    </address>
                </Col>
                <Col lg='7' className='flex align-middle'>
                    <form className='w-full lg:border-b '>
                        <Row>
                            <Col lg='3' className='mb-2'>
                                <input className='form-control border-2 border-gray-400 focus:outline-none focus:border-slate-700 shadow bg-slate-900 bg-opacity-90' name='name' placeholder='שם:' type='text' />
                            </Col>
                            <Col lg='6' className='mb-2'>
                                <input className='form-control border-2 border-gray-400 focus:outline-none focus:border-slate-700 shadow bg-slate-900 bg-opacity-90 ' name='email' placeholder='מייל:' type='email' />
                            </Col>
                            <Col lg='3' className='mb-2 '>
                                <input className='form-control border-2 border-gray-400 focus:outline-none focus:border-slate-700 shadow bg-slate-900 bg-opacity-90 ' name='phone' placeholder='טל:' type='phone' />
                            </Col>
                        </Row>

                        <textarea className='form-control border-2 border-gray-400 focus:outline-none focus:border-slate-700 shadow bg-slate-900 bg-opacity-90 ' id='massage' name='massage' placeholder='הודעה:' rows={5}></textarea>
                        <br />
                        <Row>
                            <Col lg='12' className='form-group items-center flex justify-center'>
                                <button className='text-white hover:bg-gray-700 rounded-md  border-[0.1px] bg-slate-900 bg-opacity-60 shadow p-1 px-4' type='submit'>שליחה</button>
                            </Col>
                        </Row>
                    </form>
                </Col>
                <div className='lg:border-b w-1/5 mx-3'></div>
            </Row>
    </div>
)
}