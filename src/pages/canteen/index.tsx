import React, { useState } from "react";
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
  Tabs,
  Tab,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  useGetWeekDaysQuery,
  useGetDailyMenuQuery,
} from "../../entities/canteen/canteenApi";

const CanteenMenu = () => {
  const {
    data: days,
    isLoading: isDaysLoading,
    error: daysError,
  } = useGetWeekDaysQuery();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const {
    data: menu,
    isLoading: isMenuLoading,
    error: menuError,
  } = useGetDailyMenuQuery(selectedDay || "", {
    skip: !selectedDay,
  });
  if (daysError) return <Alert severity="error">Ошибка загрузки дней</Alert>;
  if (isDaysLoading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Меню столовой
      </Typography>

      {days.length > 0 && (
        <Tabs
          value={selectedDay || false}
          onChange={(_, newValue) => setSelectedDay(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          {days.map((day) => (
            <Tab key={day} label={day} value={day} />
          ))}
        </Tabs>
      )}

      {/* Остальной код без изменений */}
      {menuError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Ошибка загрузки меню
        </Alert>
      )}

      {isMenuLoading ? (
        <CircularProgress sx={{ display: "block", mx: "auto" }} />
      ) : menu ? (
        <>
          <MealSection title="Завтрак" meals={menu.breakfast} />
          <MealSection title="Обед" meals={menu.lunch} />
          <MealSection title="Ужин" meals={menu.dinner} />
        </>
      ) : (
        !selectedDay && (
          <Typography variant="body1" color="text.secondary">
            Выберите день для просмотра меню
          </Typography>
        )
      )}
    </Box>
  );
};

const MealSection = ({ title, meals }: { title: string; meals: any[] }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "30%" }}>Блюдо</TableCell>
            <TableCell sx={{ width: "40%" }}>Описание</TableCell>
            <TableCell sx={{ width: "15%" }} align="right">
              Калории
            </TableCell>
            <TableCell sx={{ width: "15%" }} align="right">
              Цена
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal, index) => (
            <TableRow key={index}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.description}</TableCell>
              <TableCell align="right">{meal.calories} ккал</TableCell>
              <TableCell align="right">
                <Chip label={`${meal.price} ₽`} color="primary" size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default CanteenMenu;
