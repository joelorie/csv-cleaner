import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend)

export default function CountryChart({ csvData }) {
  const kenya = csvData.filter((r) => r.mobile.startsWith('+254')).length
  const tanzania = csvData.filter((r) => r.mobile.startsWith('+255')).length

  const data = {
    labels: ['Kenya', 'Tanzania'],
    datasets: [
      {
        data: [kenya, tanzania],
        backgroundColor: ['#2563eb', '#eab308'],
      },
    ],
  }

  return (
    <div className="w-80 mx-auto my-6">
      <h3 className="text-lg font-bold text-center mb-2">Country Breakdown</h3>
      <Pie data={data} />
    </div>
  )
}
