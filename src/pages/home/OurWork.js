import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import home1jpg from './images/home1jpg.jpg'

export default function OurWork() {
    return (
        <>
            <div className='w-full px-4 md:px-8 py-3 text-slate-400 bg-black md:h-[720px]' id='our'>
                <div className='md:flex lg:ml-5 justify-between  md:my-5'>
                    <div className='md:w-[80%] justify-center'>
                        <ImageList sx={{ height: 650 }} className='   md:rounded-r-xl'>
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} className='shadow-xl shadow-gray-400'>
                                    <img
                                    
                                        src={`${item.img}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.title}
                                        subtitle={<span>by: {item.author}</span>}
                                        position="below"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                    <div className='md:pr-10  md:rounded-l-2xl'>
                        <h1 className='font-bold py-8 text-2xl'>דוגמאות לפרוייקטים שעשינו</h1>
                        <p className='text-white font-bold '>כדי שנוכל לקבל פרספקטיבה על העיצוב שאנחנו רוצים, כדאי שנסתכל על פרויקטים שנעשו ולקבל רעיונות עיצוביים ממעצבים ופרויקטים שכבר נעשו</p>
                        <img className='justify-center my-20 lg:w-[500px] md:w-[350px] shadow md:mt-32' src={home1jpg} alt='back' />
                    </div>
                </div>
            </div>
        </>
    );
}

const itemData = [   
    {
        img: 'https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'A lamp',
        author: '@helloimnik',
    },
    {
        img: 'https://images.pexels.com/photos/417273/pexels-photo-417273.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'University complex',
        author: '@matrix.com',
    },
    {
        img: 'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'A cottage in North Tel Aviv',
        author: '@hjrc33',
    },
    {
        img: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'kitchen',
        author: '@arwinneil',
    },
    {
        img: 'https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Government offices',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Library',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Living room',
        author: '@silverdalex',
    },
    {
        img: 'https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        title: 'Ministry of Defence',
        author: '@shelleypauls',
},
];