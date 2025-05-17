"use client"

import { useState, useEffect } from "react"
import "./App.css"
import CountrySelector from "./components/CountrySelector"
import DateRangeFilter from "./components/DateRangeFilter"
import StatCard from "./components/StatCard"
import LineChartComponent from "./components/LineChartComponent"
import PieChartComponent from "./components/PieChartComponent"

function App() {
  const [selectedCountry, setSelectedCountry] = useState({ name: "United States", code: "usa" })
  const [countries, setCountries] = useState([])
  const [covidData, setCovidData] = useState(null)
  const [dateRange, setDateRange] = useState({
    start: "2019-01-01",
    end: "2023-12-31",
  })
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [population, setPopulation] = useState(0)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        if (!response.ok) throw new Error("Failed to fetch countries")

        const data = await response.json()

        const formattedCountries = data
          .map((country) => ({
            name: country.name.common,
            code: country.cca3.toLowerCase(),
            population: country.population,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        setCountries(formattedCountries)
      } catch (err) {
        setError("Failed to load countries. Please try again later.")
        console.error(err)
      }
    }

    fetchCountries()
  }, [])

  const fetchCovidData = async () => {
    if (!selectedCountry) return

    setIsFetching(true)
    setError(null)

    try {
      let response = await fetch(`https://disease.sh/v3/covid-19/historical/${selectedCountry.code}?lastdays=1500`)
      if (!response.ok) {
        response = await fetch(
          `https://disease.sh/v3/covid-19/historical/${encodeURIComponent(selectedCountry.name)}?lastdays=1500`,
        )
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch COVID data for ${selectedCountry.name}`)
      }

      const data = await response.json()

      if (!data || (!data.timeline && !data.cases)) {
        throw new Error(`No COVID data available for ${selectedCountry.name}`)
      }

      const processedData = {
        timeline: {
          cases: data.timeline?.cases || data.cases || {},
          deaths: data.timeline?.deaths || data.deaths || {},
          recovered: data.timeline?.recovered || data.recovered || {},
        },
      }

      setCovidData(processedData)

      const countryData = countries.find((c) => c.code === selectedCountry.code)
      if (countryData) {
        setPopulation(countryData.population)
      }

      setIsFetching(false)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching COVID data:", err)
      setError(`Failed to load COVID data is not Available for this ${selectedCountry.name}. ${err.message}`)
      setIsFetching(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCountry && countries.length > 0) {
      fetchCovidData()
    }
  }, [selectedCountry, countries])

  const processedData = () => {
    if (!covidData || !covidData.timeline) {
      return {
        totalCases: 0,
        totalRecoveries: 0,
        totalDeaths: 0,
        lineChartData: [],
        pieChartData: [],
      }
    }

    const { cases, deaths, recovered } = covidData.timeline
    if (!cases || Object.keys(cases).length === 0) {
      return {
        totalCases: 0,
        totalRecoveries: 0,
        totalDeaths: 0,
        lineChartData: [],
        pieChartData: [],
      }
    }

    const caseValues = Object.values(cases)
    const deathValues = Object.values(deaths || {})
    const recoveredValues = Object.values(recovered || {})

    const totalCases = caseValues.at(-1) || 0
    const totalDeaths = deathValues.at(-1) || 0

    const lastRecovered = recoveredValues.length > 0 ? recoveredValues.at(-1) : null
    const totalRecoveries = lastRecovered && lastRecovered > 0
      ? lastRecovered
      : Math.round(totalCases * 0.8)

    const dates = Object.keys(cases)
    const lineChartData = dates.map((date) => ({
      date,
      cases: (cases[date] || 0) / 1000000,
      deaths: (deaths?.[date] || 0) / 1000000,
      recovered: (recovered?.[date] || 0) / 1000000,
    }))

    const filteredLineData = lineChartData.filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate >= new Date(dateRange.start) && itemDate <= new Date(dateRange.end)
    })

    const pieChartData = [
      { name: "Total Cases", value: totalCases, color: "#b8b5ff" },
      { name: "Recoveries", value: totalRecoveries, color: "#00ff85" },
      { name: "Deaths", value: totalDeaths, color: "#ff3a5e" },
      { name: "Unaffected", value: Math.max(0, population - totalCases), color: "#e8f9a9" },
    ]

    return {
      totalCases,
      totalRecoveries,
      totalDeaths,
      lineChartData: filteredLineData,
      pieChartData,
    }
  }

  const { totalCases, totalRecoveries, totalDeaths, lineChartData, pieChartData } = processedData()

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num
  }

  return (
    <div className="dashboard">
      <h1>COVID-19 and Population Dashboard</h1>

      <div className="filters">
        <CountrySelector countries={countries} selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />
        <DateRangeFilter dateRange={dateRange} onDateRangeChange={setDateRange} />
      </div>

      {loading ? (
        <div className="loading">Loading data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="dashboard-content">
          {isFetching && <div className="overlay">Loading new data...</div>}

          <div className="stat-cards">
            <StatCard title="Total Cases" value={formatNumber(totalCases)} color="purple" />
            <StatCard title="Recoveries" value={formatNumber(totalRecoveries)} color="green" />
            <StatCard title="Deaths" value={formatNumber(totalDeaths)} color="red" />
          </div>

          <div className="charts">
            <div className="chart-container">
              <h2>Line Chart</h2>
              <LineChartComponent data={lineChartData} />
            </div>

            <div className="chart-container">
              <h2>Pie Chart</h2>
              <PieChartComponent data={pieChartData} population={population} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App


