import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { API_URL } from '../constant/url'
import { apiGet } from '../services/apiServices';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';

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
            "#E1B109",
            "#1976D2",
            "#DC2626"
        ],
        dataLabels: {
            style: {
                fontWeight: 300
            }
        },
        fill: {
            opacity: 2
        },
        grid: {
            padding: {
                top: 50,
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
            width: 4
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
        <div className='mission cheat mr-[20px] md:flex block  justify-between h-[54vh] 2xl:h-[66vh] overflow-y-auto md:overflow-hidden w-full md:w-2/3 mb-4 bg-stone-800 text-white rounded-lg'>
            <div className='md:w-1/2 w-full md:border-l'>
                <div className='w-full h-full overflow-y-auto'>
                    {data.length === 0 ? <h2 className='w-full sticky-top overflow-hidden text-2xl bg-zinc-700 p-2 border-b border-b-slate-400 rounded-tr-lg text-cyan-400'><InventoryOutlinedIcon /> אין משימות</h2> :
                        <>
                            <h2 className='w-full sticky top-0 overflow-hidden text-2xl p-2 border-b border-b-slate-400 rounded-tr-lg bg-stone-800 jus text-cyan-400'> <InventoryOutlinedIcon /> משימות</h2>
                            {data.map((mission, index) => (
                                <p key={mission._id || index} className='w-full h-[56px] text-right pr-3 cursor-pointer hover:bg-zinc-700 text-lg p-1  flex items-center justify-between border-b border-b-gray-500'>
                                    <span className='mr-2 text-slate-200'>
                                        {mission.title}
                                    </span>
                                    <span>
                                        {mission.execution_status === 'waiting' ? (
                                            <span className="text-orange-500 border px-3 ml-3 rounded-lg">
                                                ממתין
                                            </span>
                                        ) : (
                                            mission.execution_status === 'done' && (
                                                <span className="text-green-500 border px-3 ml-3 rounded-lg">
                                                    בוצע
                                                </span>
                                            )
                                        )}
                                    </span>
                                </p>
                            ))}
                        </>
                    }
                </div>
            </div >
            <div className='md:w-1/2 w-full h-full pb-1'>
                <h2 className='w-full text-2xl border-b border-b-slate-400 rounded-tl-lg p-2 text-cyan-500'><InsertChartOutlinedOutlinedIcon />נתונים</h2>
                <ReactApexChart options={chartData} series={chartData.series} type={chartData.chart.type} width={chartData.chart.width} height={chartData.chart.height} />
            </div>
        </div>
    );
}
