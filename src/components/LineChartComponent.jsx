import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const LineChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="empty-chart">
        <p>No data available for the selected time period</p>
      </div>
    )
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.getFullYear()
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-date">{formatDate(label)}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(1)}M`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const predefinedYears = [2019, 2020, 2021, 2022, 2023]

  const totals = data.reduce(
    (acc, curr) => {
      acc.cases += curr.cases || 0
      acc.recovered += curr.recovered || 0
      acc.deaths += curr.deaths || 0
      return acc
    },
    { cases: 0, recovered: 0, deaths: 0 }
  )

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            ticks={predefinedYears.map((year) => new Date(`${year}-01-01`).toISOString())}
          />
          <YAxis
            tickFormatter={(value) => `${value.toFixed(1)}`}
            domain={[0, "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#b8b5ff"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
            name="Cases"
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="#00ff85"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
            name="Recovered"
          />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke="#ff3a5e"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
            name="Deaths"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="pie-summary" style={{ marginTop: "15px" }}>
        <div className="summary-item">
          <div className="color-box" style={{ backgroundColor: "#b8b5ff" }}></div>
          Total Cases: {totals.cases.toFixed(1)}M
        </div>
        <div className="summary-item">
          <div className="color-box" style={{ backgroundColor: "#00ff85" }}></div>
          Total Recovered: {totals.recovered.toFixed(1)}M
        </div>
        <div className="summary-item">
          <div className="color-box" style={{ backgroundColor: "#ff3a5e" }}></div>
          Total Deaths: {totals.deaths.toFixed(1)}M
        </div>
      </div>
    </>
  )
}

export default LineChartComponent
