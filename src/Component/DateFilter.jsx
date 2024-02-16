import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/lab'

const DateFilter = ({ onDateChange }, title) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date)
    onDateChange(date)
  }

  const handleToggleDatePicker = () => {
    setShowDatePicker((prevShowDatePicker) => !prevShowDatePicker)
  }

  return (
    <div>
      <Button
        onClick={handleToggleDatePicker}
        variant="contained"
        color="primary"
      >
        {title}
      </Button>
      {showDatePicker && (
        <LocalizationProvider dateAdapter={DateCalendar}>
          <DatePicker />
        </LocalizationProvider>
      )}
    </div>
  )
}

export default DateFilter
