import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangeFilter = ({ dateRange, onDateRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleStartChange = (startDate) => {
    onDateRangeChange({ ...dateRange, start: startDate });
  };

  const handleEndChange = (endDate) => {
    onDateRangeChange({ ...dateRange, end: endDate });
  };

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="date-range-filter" style={{ position: "relative" }}>
      <label>Filter by date range:</label>

      <div
        className="date-selector"
        style={{
          marginBottom: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "250px",
          color:"black"
        }}
        onClick={toggleCalendar}
      >
        <span>{`${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`}</span>
        <span className="dropdown-arrow">▼</span>
      </div>

      {isOpen && (
        <div
          className="calendar-dropdown"
          style={{
            position: "absolute",
            top: "70px",
            zIndex: 10,
            background: "#fff",
            padding: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <DatePicker
              selected={new Date(dateRange.start)}
              onChange={handleStartChange}
              selectsStart
              startDate={new Date(dateRange.start)}
              endDate={new Date(dateRange.end)}
              inline
            />
            <DatePicker
              selected={new Date(dateRange.end)}
              onChange={handleEndChange}
              selectsEnd
              startDate={new Date(dateRange.start)}
              endDate={new Date(dateRange.end)}
              minDate={new Date(dateRange.start)}
              inline
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
