import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FadeMenu({ wardNumbers, onSelectWard }) {
  const [selectedWard, setSelectedWard] = useState("");

  const handleChange = (event) => {
    setSelectedWard(event.target.value);
    onSelectWard(event.target.value); // Call the onSelectWard function with the selected value
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200, minHeight: 10 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Ward</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedWard}
          onChange={handleChange}
          autoWidth
          label="Ward"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {wardNumbers.map((wardNumber) => (
            <MenuItem key={wardNumber} value={wardNumber}>
              {wardNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
