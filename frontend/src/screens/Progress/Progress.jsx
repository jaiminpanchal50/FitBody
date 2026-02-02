import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'; // <-- ADD THIS IMPORT
import 'apexcharts/dist/apexcharts.css';
import './style.css';
const Progress = () => {
    let monthlyData = {
        title: 'Monthly',
        series: [{
            name: "Monthly",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: true,
                }
            },
            theme: {
                mode: 'dark', // set the theme to dark
                palette: 'palette1', // optional: choose a predefined palette
                paletteColors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#4f35a1'],
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Monthly Progress Chart',
                align: 'center',
                // margin: 20,
                offsetY: 15,
                style: {
                    fontWeight: 'bold',
                    fontSize: '22px',
                }
            },
            grid: {
                row: {
                    colors: ['#B8E6FE', '#A2F4FD'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            },
            yaxis: {
                min: 0,
                max: 200,
                tickAmount: 4,
                labels: {
                    formatter: function (val) {
                        return val + " kg";
                    }
                }
            }
        }
    }
    let weeklyData = {
        title: 'Weekly',
        series: [{
            name: "Weekly",
            data: [10, 41, 35, 51]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: true
                },
                toolbar: {
                    show: true,
                }
            },
            theme: {
                mode: 'dark', // set the theme to dark
                palette: 'palette1', // optional: choose a predefined palette
                paletteColors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#4f35a1'],
                monochrome: {
                    enabled: false,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Weekly Progress Chart',
                align: 'center',
                // margin: 20,
                offsetY: 15,
                style: {
                    fontWeight: 'bold',
                    fontSize: '22px',
                }
            },
            grid: {
                row: {
                    colors: ['#B8E6FE', '#A2F4FD'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Week1', 'Week2', 'Week3', 'Week4'],
            },
            yaxis: {
                min: 0,
                max: 200,
                tickAmount: 4,
                labels: {
                    formatter: function (val) {
                        return val + " kg";
                    }
                }
            }
        }
    }
    const [state, setState] = useState(monthlyData);

    console.log('state', state);
    let workoutName = [];

    let workoutLogs = localStorage.getItem('workoutLogs');
    workoutLogs = JSON.parse(workoutLogs) || [];

    workoutLogs.map((workout) => {
        // console.log('workout', workout);
        if (!workoutName.includes(workout.title)) {
            workoutName.push(workout.title);
        }
    })

    // console.log('workoutName', workoutName);

    useEffect(() => {
        console.log('workoutlogs', workoutLogs);
    }, [])


    return (
        <section className="progress py-10 sm:py-15 lg:py-20" >
            <div className="page-center">
                <div className='filterbtn flex gap-4 justify-center mb-10'>
                    <button onClick={() => { setState(weeklyData) }} className="relative overflow-hidden rounded-md px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110" style={{ backgroundColor: `${state.title == 'Weekly' ? 'blue' : 'rgb(22, 33, 62)'}` }}>Weekly Progress</button>
                    <button onClick={() => { setState(monthlyData) }} className="relative overflow-hidden rounded-md px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110" style={{ backgroundColor: `${state.title == 'Monthly' ? 'blue' : 'rgb(22, 33, 62)'}` }}>Monthly Progress</button>
                    <div>
                        <select
                            className="px-6 py-2.5 bg-gray-800/70 border-2 border-gray-600 hover:border-gray-500 rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                            {workoutName.map((type) => (
                                <option key={type} value={type} className="bg-gray-800 text-white">
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='weekly-chart'>
                    <div id="chart" className='max-w-4xl mx-auto'>
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="line"
                            height={350}
                        />
                    </div>
                    <div id="html-dist"></div>
                </div>
            </div>
        </section >
    )
}

export default Progress;
