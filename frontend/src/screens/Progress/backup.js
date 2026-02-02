import React, { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import './style.css';

/* ---------------- HELPERS ---------------- */

const parseDate = (dateStr) => {
    // supports dd/mm/yyyy & d/m/yyyy
    const [d, m, y] = dateStr.split('/');
    return new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
};

const getWeekOfMonth = (date) => {
    return Math.ceil(date.getDate() / 7);
};

const getMonthKey = (date) => {
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
};

/* ---------------- COMPONENT ---------------- */

const Progress = () => {
    const workoutLogs = JSON.parse(localStorage.getItem('workoutLogs')) || [];

    const [view, setView] = useState('Monthly');
    const [selectedWorkout, setSelectedWorkout] = useState('All');

    /* -------- Workout Dropdown -------- */

    const workoutNames = useMemo(() => {
        return ['All', ...new Set(workoutLogs.map(w => w.title))];
    }, [workoutLogs]);

    /* -------- Filtered Logs -------- */

    const filteredLogs = useMemo(() => {
        return selectedWorkout === 'All'
            ? workoutLogs
            : workoutLogs.filter(w => w.title === selectedWorkout);
    }, [workoutLogs, selectedWorkout]);

    /* -------- WEEKLY DATA -------- */

    const weeklyResult = useMemo(() => {
        const map = {};

        filteredLogs.forEach(workout => {
            const date = parseDate(workout.date);
            const week = `Week ${getWeekOfMonth(date)}`;

            workout.exercises.forEach(ex => {
                map[week] = Math.max(map[week] || 0, Number(ex.maxWeight));
            });
        });

        return {
            categories: Object.keys(map),
            data: Object.values(map),
        };
    }, [filteredLogs]);

    /* -------- MONTHLY DATA -------- */

    const monthlyResult = useMemo(() => {
        const map = {};

        filteredLogs.forEach(workout => {
            const date = parseDate(workout.date);
            const month = getMonthKey(date);

            workout.exercises.forEach(ex => {
                map[month] = Math.max(map[month] || 0, Number(ex.maxWeight));
            });
        });

        return {
            categories: Object.keys(map),
            data: Object.values(map),
        };
    }, [filteredLogs]);

    /* -------- COMMON OPTIONS -------- */

    const baseOptions = {
        chart: {
            height: 350,
            type: 'line',
            zoom: { enabled: true },
            toolbar: { show: true },
        },
        theme: {
            mode: 'dark',
            palette: 'palette1',
        },
        dataLabels: { enabled: true },
        stroke: { curve: 'straight' },
        grid: {
            row: {
                colors: ['#B8E6FE', '#A2F4FD'],
                opacity: 0.5,
            },
        },
        yaxis: {
            min: 0,
            max: 200,
            tickAmount: 4,
            labels: {
                formatter: (val) => `${val} kg`,
            },
        },
    };

    /* -------- FINAL CHART STATE -------- */

    const state =
        view === 'Weekly'
            ? {
                title: 'Weekly',
                series: [{ name: 'Weekly', data: weeklyResult.data }],
                options: {
                    ...baseOptions,
                    title: {
                        text: 'Weekly Progress Chart',
                        align: 'center',
                        offsetY: 15,
                        style: { fontWeight: 'bold', fontSize: '22px' },
                    },
                    xaxis: { categories: weeklyResult.categories },
                },
            }
            : {
                title: 'Monthly',
                series: [{ name: 'Monthly', data: monthlyResult.data }],
                options: {
                    ...baseOptions,
                    title: {
                        text: 'Monthly Progress Chart',
                        align: 'center',
                        offsetY: 15,
                        style: { fontWeight: 'bold', fontSize: '22px' },
                    },
                    xaxis: { categories: monthlyResult.categories },
                },
            };

    /* ---------------- UI ---------------- */

    return (
        <section className="progress py-10 sm:py-15 lg:py-20">
            <div className="page-center">
                <div className="filterbtn flex gap-4 justify-center mb-10">

                    <button
                        onClick={() => setView('Weekly')}
                        className="relative overflow-hidden rounded-md px-5 py-2.5 text-white transition-all duration-300"
                        style={{ backgroundColor: view === 'Weekly' ? 'blue' : 'rgb(22, 33, 62)' }}
                    >
                        Weekly Progress
                    </button>

                    <button
                        onClick={() => setView('Monthly')}
                        className="relative overflow-hidden rounded-md px-5 py-2.5 text-white transition-all duration-300"
                        style={{ backgroundColor: view === 'Monthly' ? 'blue' : 'rgb(22, 33, 62)' }}
                    >
                        Monthly Progress
                    </button>

                    <select
                        value={selectedWorkout}
                        onChange={(e) => setSelectedWorkout(e.target.value)}
                        className="px-6 py-2.5 bg-gray-800/70 border-2 border-gray-600 hover:border-gray-500 rounded-lg text-white font-medium"
                    >
                        {workoutNames.map(type => (
                            <option key={type} value={type} className="bg-gray-800">
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="weekly-chart">
                    <div id="chart" className="max-w-4xl mx-auto">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="line"
                            height={350}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Progress;
