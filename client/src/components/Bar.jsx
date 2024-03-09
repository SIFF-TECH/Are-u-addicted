import { Bar } from "react-chartjs-2";


export default function BarChart({chartData}){
var options={
    scales:{
        x:{
            stacked:true
        },
        y:{
            beginAtZero:true
        }
    }

}
    return(
        <Bar data={chartData} options={options} />
    )
}