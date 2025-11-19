export default function SummaryCards({ csvData }) {
  const total = csvData.length
  const duplicates = csvData.filter((r) => r.isDuplicate).length
  const invalid = csvData.filter((r) => r.isInvalid).length
  const valid = total - invalid
  const duplicatePercent = total ? ((duplicates / total) * 100).toFixed(1) : 0

  const kenyaCount = csvData.filter((r) => r.mobile.startsWith('+254')).length
  const tanzaniaCount = csvData.filter((r) =>
    r.mobile.startsWith('+255')
  ).length

  return (
    <div className="flex flex-row flex-wrap gap-2 justify-evenly my-4">
      <Card
        title="Total Rows"
        value={total}
        color="text-success-content"
        background="bg-success"
      />

      <Card
        title="Valid Numbers"
        value={valid}
        color="text-green-500"
        background="bg-base-200"
      />

      <Card
        title="Duplicate Rows"
        value={`${duplicates} (${duplicatePercent}%)`}
        color="text-neutral-content"
        background="bg-neutral"
      />

      <Card
        title="Invalid Rows"
        value={invalid}
        color="text-secondary-content"
        background="bg-secondary"
      />

      <Card
        title="Kenya (+254)"
        value={kenyaCount}
        color="text-accent-content"
        background="bg-accent"
      />

      <Card
        title="Tanzania (+255)"
        value={tanzaniaCount}
        color="text-info-content"
        background="bg-info"
      />
    </div>
  )
}

const Card = ({ title, value, color, background }) => (
  <div className={`card card-border w-48 ${background ?? 'bg-base-100'}`}>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
)
