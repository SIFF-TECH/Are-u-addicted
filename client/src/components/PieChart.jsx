import React from 'react';

import {Line , Pie ,Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'


 function pieChart({chartData}){


    return(
        <>
        <Doughnut data={chartData} width={300} height={150} xs={8} />
        </>
    )
}

export default pieChart;