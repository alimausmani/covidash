import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const PieChartComponent = ({ data, population }) => {
  const hasData = data && data.some((item) => item.value > 0)

  if (!hasData) {
    return (
      <div className="empty-chart">
        <p>No data available for the selected country</p>
      </div>
    )
  }

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B"
    else if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    else if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].name}: ${formatNumber(payload[0].value)}`}</p>
        </div>
      )
    }
    return null
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    if (percent === 0) return null 

    return (
      <text
        x={x}
        y={y}
        fill="black"
        fontSize={12}
        fontWeight="bold"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '2px 5px', borderRadius: 3 }}
      >
        {(percent * 100).toFixed(0)}%
      </text>
    )
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="pie-chart-label"
            fontSize={14}
            fontWeight="bold"
            fill="#555"
          >
            {`${formatNumber(population)} Total Population`}
          </text>
        </PieChart>
      </ResponsiveContainer>

      <div className="pie-summary">
        {data.map((item, i) => {
          const total = data.reduce((acc, cur) => acc + cur.value, 0)
          const percent = total ? ((item.value / total) * 100).toFixed(1) : 0
          return (
            <div key={i} className="summary-item" style={{ backgroundColor: item.color + "33"}}>
              <div className="color-box" style={{ backgroundColor: item.color }}></div>
              <span className="summary-text">{item.name}: {formatNumber(item.value)} ({percent}%)</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PieChartComponent
