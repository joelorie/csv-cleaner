import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { getTelco } from '../utils/phoneUtils'
Chart.register(ArcElement, Tooltip, Legend)

export default function TelcoChart({ csvData }) {
  const telcoCounts = csvData.reduce((acc, row) => {
    const t = getTelco(row.mobile) || 'Unknown'
    acc[t] = (acc[t] || 0) + 1
    return acc
  }, {})

  const data = {
    labels: Object.keys(telcoCounts),
    datasets: [
      {
        data: Object.values(telcoCounts),
        backgroundColor: [
          '#eab308',
          '#22c55e',
          '#ef4444',
          '#9333ea',
          '#3b82f6',
          '#9ca3af',
        ],
      },
    ],
  }

  return (
    <div className="w-80 mx-auto my-6">
      <h3 className="text-lg font-bold text-center mb-2">Telco Distribution</h3>
      <Pie data={data} />
    </div>
  )
}
