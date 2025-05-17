
"use client"

import { useState } from "react"
import { Search } from "lucide-react"

const CountrySelector = ({ countries, selectedCountry, onSelectCountry }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (country) => {
    console.log("Selected ISO Code:", country.isoCode)
    onSelectCountry(country)
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="country-selector">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <Search className="search-icon" />
        <input
          style={{ background: "white", color: "black" }}
          type="text"
          placeholder="Search Country"
          value={searchTerm || (selectedCountry ? selectedCountry.name : "")}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(true)
          }}
        />
        <span className="dropdown-arrow">▼</span>
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <li
                key={country.isoCode || country.name}
                onClick={() => handleSelect(country)}
                className={selectedCountry?.isoCode === country.isoCode ? "selected" : ""}
              >
                {country.name}{country.isoCode ? ` (${country.isoCode})` : ""}
              </li>
            ))
          ) : (
            <li className="no-results">No countries found</li>
          )}
        </ul>
      )}
    </div>
  )
}

export default CountrySelector
