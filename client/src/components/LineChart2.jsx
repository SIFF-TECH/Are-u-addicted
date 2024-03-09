import {Line} from 'react-chartjs-2'



 function lineChart2({chartData}){
var options2={
    scales: {
      
      
      x:{
        grid:{
          display:false
        }
      }
       
      },
      maintainAspectRatio: false,
        plugins: {
            legend: false // Hide legend
        },
        scales: {
            y: {
                display: false // Hide Y axis labels
            },
            x: {
                display: false // Hide X axis labels
            }
        }   

     
  }

    return(
        <>
        <Line data={chartData} width={300} height={150} options={options2} />
        </>
    )
}

export default lineChart2;