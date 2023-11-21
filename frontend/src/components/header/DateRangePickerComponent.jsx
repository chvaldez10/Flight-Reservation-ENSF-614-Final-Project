import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Box, TextField, ClickAwayListener } from "@mui/material";
import "react-date-range/dist/styles.css"; // main styles
import "react-date-range/dist/theme/default.css"; // theme styles

const DateRangePickerComponent = ({
  initialStartDate,
  initialEndDate,
  handleDateChange,
}) => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: initialStartDate,
      endDate: initialEndDate,
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    handleDateChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const handleToggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const handleClickAway = () => {
    setCalendarVisible(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box position="relative" zIndex="modal">
        <TextField
          size="small"
          variant="outlined"
          label="Departure"
          value={`${format(dateRange[0].startDate, "MM/dd/yyyy")} - ${
            dateRange[0].endDate
              ? format(dateRange[0].endDate, "MM/dd/yyyy")
              : ""
          }`}
          onClick={handleToggleCalendar}
          readOnly
        />

        {calendarVisible && (
          <Box position="absolute" top="100%" left="0" zIndex="modal">
            <DateRange
              editableDateInputs={true}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              direction="vertical"
            />
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default DateRangePickerComponent;
