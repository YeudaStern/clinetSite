import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { API_URL } from '../constant/url'
import { apiGet } from '../services/apiServices';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';

export default function Mission() {
    const nav = useNavigate();
    const [data, setData] = useState([])

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        let url = API_URL + '/missions/missionsList';
        try {
            let data = await apiGet(url)
            console.log(data);
            setData(data);

        } catch (error) {
            console.log(error);

        }
    }

    const chartData = {
        chart: {
            animations: {
                enabled: false
            },
            dropShadow: {
                enabled: true,
                left: 3,
                blur: 3,
                color: "#E7F9F9"
            },
            foreColor: "white",
            fontFamily: "Roboto",
            height: '85%',
            id: "xbOsH",
            toolbar: {
                show: false
            },
            type: "donut",
            width: '100%'
        },
        plotOptions: {
            bar: {
                borderRadius: 10
            },
            radialBar: {
                dataLabels: {
                    name: {},
                    value: {},
                    total: {}
                }
            },
            pie: {
                donut: {
                    size: "54%",
                    labels: {
                        show: true,
                        name: {
                            fontSize: 37,
                            fontWeight: 400
                        },
                        value: {
                            fontSize: 24,
                            fontWeight: 300
                        },
                        total: {
                            show: true,
                            fontSize: 18,
                            fontWeight: 500,
                            color: "white"
                        }
                    }
                }
            }
        },
        colors: [
            "#FFFF00",
            "#1976D2",
            "#DC2626"
        ],
        dataLabels: {
            style: {
                fontWeight: 700
            }
        },
        fill: {
            opacity: 1
        },
        grid: {
            padding: {
                top: 100,
                right: -74,
                left: 10
            }
        },
        labels: [
            "פרוייקטים",
            "לקוחות",
            "קבלנים"
        ],
        legend: {
            position: "right",
            fontSize: 14,
            offsetY: 0,
            itemMargin: {
                vertical: 0
            }
        },
        series: [
            9,
            12,
            22
        ],
        stroke: {
            width: 7
        },
        tooltip: {
            fillSeriesColor: true
        },
        xaxis: {
            labels: {
                trim: true,
                style: {}
            },
            title: {
                style: {
                    fontWeight: 700
                }
            }
        },
        yaxis: {
            labels: {
                style: {}
            },
            title: {
                style: {
                    fontWeight: 700
                }
            }
        },
        theme: {
            palette: "palette3"
        }
    };

    return (
        <div className='mission mr-[20px] md:flex block  justify-between h-[66vh] overflow-y-auto md:overflow-hidden w-full md:w-2/3 mb-4 bg-stone-800 text-white rounded-lg'>
            <div className='md:w-1/2 w-full md:border-l'>
                <div className='w-full h-5/6 overflow-y-auto'>
                    {data.length === 0 ? <h2 className='w-full sticky-top overflow-hidden text-2xl bg-zinc-700 p-2 border-b border-b-slate-400 rounded-tr-lg'>אין משימות</h2> :
                        <>
                            <h2 className='w-full sticky-top overflow-hidden text-2xl p-2 border-b border-b-slate-400 rounded-tr-lg bg-stone-800'>משימות</h2>
                            {data.map((mission) => (
                                <p className='w-full h-[56px] text-right pr-3 cursor-pointer hover:bg-zinc-700 text-lg p-1 pt-3 justify-between flex border-b border-b-slate-400'>
                                <span >  <FiberManualRecordOutlinedIcon /> {mission.title} -</span>
                                  
                                    {mission.execution_status === 'waiting' ? (
                                        <span className="bg-orange-500 border-black text-white px-2 mr-2 rounded-lg md:ml-2">
                                            ממתין
                                        </span>
                                    ) : (
                                        <span className="bg-green-500 border-black text-white px-2 mr-2 rounded-lg md:ml-2">
                                            {mission.execution_status === 'done' ? 'בוצע' : ''}
                                        </span>
                                    )}
                                </p>
                            ))}
                        </>
                    }
                </div>
                <div className='w-full h-1/6 p-2 justify-around flex items-center  bg-stone-800 overflow-hidden border-t border-t-slate-600 rounded-br-lg'>
                    <button onClick={() => { nav('/users/newUser') }} className='w-1/4 bg-red-600 rounded-lg '>הוסף משתמש</button>
                    <button onClick={() => { nav('/projects/newProject') }} className='w-1/4 bg-lime-400 rounded-lg '>הוסף פרויקט</button>
                    <button onClick={() => { nav('/missions/newMission') }} className='w-1/4 bg-orange-400 rounded-lg '>הוסף משימה</button>
                </div>
            </div>
            <div className='md:w-1/2 w-full h-1/2 md:h-full'>
                <h2 className='w-full text-2xl border-b border-b-slate-400 rounded-tl-lg p-2'>נתונים באתר</h2>
                <ReactApexChart options={chartData} series={chartData.series} type={chartData.chart.type} width={chartData.chart.width} height={chartData.chart.height} />
            </div>
        </div>
    );
}
