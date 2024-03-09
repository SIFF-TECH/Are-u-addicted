import React from 'react';

import {Line} from 'react-chartjs-2'



 function lineChart({chartData}){
var options={
    scales: {
      
      
      x:{
        grid:{
          display:false
        }
      }
       
      }
     
  }

    return(
        <>
        <Line data={chartData} width={300} height={150} options={options} />
        </>
    )
}

export default lineChart;