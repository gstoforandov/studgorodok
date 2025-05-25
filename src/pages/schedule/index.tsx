import { useState } from "react";
import { useLazyGetScheduleQuery } from "../../entities/schedule/scheduleApi";
import ScheduleTable from "./ui/table";
import {
  Box,
  Autocomplete,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";

const groupOptions = [
  { label: "КТбо1-1", value: "1.html" },
  { label: "КТбо1-2", value: "2.html" },
  { label: "КТбо1-3", value: "3.html" },
  { label: "КТбо1-4", value: "4.html" },
  { label: "КТбо1-5", value: "5.html" },
  { label: "КТбо1-10", value: "10.html" },
  { label: "КТбо1-11", value: "11.html" },
  { label: "КТбо1-12", value: "12.html" },
  { label: "КТбо1-13", value: "13.html" },
  { label: "КТбо1-14", value: "14.html" },
  { label: "КТсо1-1", value: "15.html" },
  { label: "КТсо1-2", value: "16.html" },
  { label: "КТсо1-3", value: "17.html" },
  { label: "КТсо1-4", value: "18.html" },
  { label: "КТсо1-5", value: "19.html" },
  { label: "КТсо1-6", value: "20.html" },
];

export const Schedule = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [getSchedule, { data, isLoading, error }] = useLazyGetScheduleQuery({});

  const handleSelectWeek = (value) => {
    console.log(value);
    getSchedule({ query: selectedGroup.value, week: `&week=${value}` });
  };

  const handleGroupChange = (_, newValue) => {
    setSelectedGroup(newValue);
    if (newValue) {
      getSchedule({ query: newValue.value });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Box sx={{ p: 2, width: 1540, display: "flex", flexDirection: "column" }}>
        <Autocomplete
          options={groupOptions}
          value={selectedGroup}
          onChange={handleGroupChange}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите группу"
              variant="outlined"
              sx={{ mb: 2, width: 300 }}
            />
          )}
        />

        {isLoading && (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        )}
        {!selectedGroup && (
          <Typography sx={{ mt: 2 }} color="text.secondary">
            Пожалуйста, выберите группу для отображения расписания
          </Typography>
        )}
        {data && selectedGroup && (
          <ScheduleTable
            handleSelectWeek={handleSelectWeek}
            scheduleData={data}
          />
        )}
      </Box>
    </Box>
  );
};
