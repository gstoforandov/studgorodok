import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";

const ScheduleTable = ({ scheduleData, handleSelectWeek }) => {
  const [selectedWeek, setSelectedWeek] = useState(scheduleData.table.week);

  useEffect(() => {
    return () => handleSelectWeek(null);
  }, []);
  if (!scheduleData || !scheduleData.table) {
    return (
      <Typography variant="body1">Данные расписания не загружены</Typography>
    );
  }

  const { table, weeks } = scheduleData;
  const [pairsHeader, timeHeader, ...daysData] = table.table;

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
    handleSelectWeek(event.target.value);
    // Здесь можно добавить запрос на получение расписания для выбранной недели
  };

  const parseLesson = (lessonText) => {
    if (!lessonText) return null;

    const parts = lessonText.split(" ");
    const type = parts[0].includes(".") ? parts.shift().replace(/\.$/, "") : "";
    const teacherMatch = lessonText.match(/([А-Я][а-я]+\s[А-Я]\.\s[А-Я]\.)/);
    const roomMatch = lessonText.match(/([А-Я]-?\d+[а-я]?)/);

    return {
      type,
      name: parts
        .slice(0, teacherMatch ? parts.indexOf(teacherMatch[0]) : undefined)
        .join(" "),
      teacher: teacherMatch ? teacherMatch[0] : "",
      room: roomMatch ? roomMatch[0] : "",
      subgroup: lessonText.includes("п/г")
        ? lessonText.match(/(\d+\sп\/г)/)?.[0]
        : "",
    };
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2">
          Расписание группы {table.name}
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Неделя</InputLabel>
          <Select
            value={selectedWeek}
            label="Неделя"
            onChange={handleWeekChange}
          >
            {weeks.map((week) => (
              <MenuItem key={week} value={week}>
                {week} неделя
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <TableContainer component={Paper} sx={{ maxHeight: "75vh", mb: 3 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 150, fontWeight: "bold" }}>
                День/Пара
              </TableCell>
              {pairsHeader.slice(1).map((pair, index) => (
                <TableCell key={index} align="center" sx={{ minWidth: 180 }}>
                  <Box sx={{ fontWeight: "bold" }}>{pair}</Box>
                  <Box sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                    {timeHeader[index + 1]}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {daysData.map((day, dayIndex) => (
              <TableRow key={dayIndex}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ fontWeight: "bold" }}
                >
                  {day[0].split(",").map((part, i) => (
                    <div key={i}>{part.trim()}</div>
                  ))}
                </TableCell>
                {day.slice(1).map((lesson, lessonIndex) => (
                  <TableCell
                    key={lessonIndex}
                    sx={{
                      bgcolor: lesson ? "background.paper" : "action.hover",
                      verticalAlign: "top",
                    }}
                  >
                    {lesson &&
                      lesson.split("\n").map((line, i) => {
                        if (!line.trim()) return null;
                        const parsed = parseLesson(line);
                        return (
                          <Box
                            key={i}
                            sx={{
                              mb: 1,
                              p: 1,
                              bgcolor: "primary.light",
                              borderRadius: 1,
                            }}
                          >
                            {parsed?.type && (
                              <Chip
                                label={parsed.type}
                                size="small"
                                sx={{
                                  mb: 0.5,
                                  bgcolor: "primary.main",
                                  color: "white",
                                }}
                              />
                            )}
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold", whiteSpace: "normal" }}
                            >
                              {parsed?.name}
                            </Typography>
                            {parsed?.teacher && (
                              <Typography variant="caption" display="block">
                                {parsed.teacher}
                              </Typography>
                            )}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 0.5,
                              }}
                            >
                              {parsed?.subgroup && (
                                <Chip
                                  label={parsed.subgroup}
                                  size="small"
                                  sx={{ bgcolor: "secondary.light" }}
                                />
                              )}
                              {parsed?.room && (
                                <Chip
                                  label={parsed.room}
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>
                        );
                      })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScheduleTable;
