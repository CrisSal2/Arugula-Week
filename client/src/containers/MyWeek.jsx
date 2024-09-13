import React, { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function MyWeek() {
  const [meals, setMeals] = useState({
    Saturday: { breakfast: '', lunch: '', dinner: '' },
    Sunday: { breakfast: '', lunch: '', dinner: '' },
    Monday: { breakfast: '', lunch: '', dinner: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '' },
    Friday: { breakfast: '', lunch: '', dinner: '' },
  });

  const [copyBreakfast, setCopyBreakfast] = useState(false);
  const [copyLunch, setCopyLunch] = useState(false);
  const [copyDinner, setCopyDinner] = useState(false);

  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initially set to the current date

  const handleDateChange = (e) => {
    setSelectedDate(dayjs(e.target.value));
  };

  // Get the week start (Sunday) and end (Saturday) based on the selected date
  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = dayjs(startOfWeek).add(6, 'day');
  const formattedStartOfWeek = startOfWeek.format('MM/DD/YYYY');
  const formattedEndOfWeek = endOfWeek.format('MM/DD/YYYY');

  const handleInputChange = (day, mealType, value) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [day]: { ...prevMeals[day], [mealType]: value },
    }));
  };

  const copyMealToAllDays = (mealType) => {
    const firstDayMeal = meals['Saturday'][mealType];
    setMeals(prevMeals => {
      const updatedMeals = { ...prevMeals };
      daysOfWeek.forEach((day) => {
        if (day !== 'Saturday') {
          updatedMeals[day][mealType] = firstDayMeal;
        }
      });
      return updatedMeals;
    });
  };

  const handleSubmitWeek = async () => {
    try {
      const response = await fetch('/api/addWeek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meals, weekStart: formattedStartOfWeek, weekEnd: formattedEndOfWeek }),
      });

      if (response.ok) {
        console.log('Week data submitted successfully!');
        // Optionally, reset the form here
      } else {
        console.error('Failed to submit week data');
      }
    } catch (error) {
      console.error('Error submitting week data:', error);
    }
  };

  return (
    <div>
      {/* Week picker */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Select a Week</h2>
        <input
          type="date"
          value={selectedDate.format('YYYY-MM-DD')}
          onChange={handleDateChange}
          className="border p-2 rounded-md"
        />
      </div>

      {/* Week range display */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          The week of {formattedStartOfWeek} - {formattedEndOfWeek}
        </h2>
      </div>

      {/* Copy checkboxes */}
      <div className="flex justify-center mb-6 space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={copyBreakfast}
            onChange={(e) => {
              setCopyBreakfast(e.target.checked);
              if (e.target.checked) {
                copyMealToAllDays('breakfast');
              }
            }}
            className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
          />
          <span className="text-sm font-medium">Copy Breakfast</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={copyLunch}
            onChange={(e) => {
              setCopyLunch(e.target.checked);
              if (e.target.checked) {
                copyMealToAllDays('lunch');
              }
            }}
            className="form-checkbox h-5 w-5 text-green-600 transition duration-150 ease-in-out"
          />
          <span className="text-sm font-medium">Copy Lunch</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={copyDinner}
            onChange={(e) => {
              setCopyDinner(e.target.checked);
              if (e.target.checked) {
                copyMealToAllDays('dinner');
              }
            }}
            className="form-checkbox h-5 w-5 text-red-600 transition duration-150 ease-in-out"
          />
          <span className="text-sm font-medium">Copy Dinner</span>
        </label>
      </div>

      {/* Meal inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4">{day}</h3>
            <div className="mb-2">
              <label className="block text-sm font-medium">Breakfast:</label>
              <input
                type="text"
                value={meals[day].breakfast}
                onChange={(e) => handleInputChange(day, 'breakfast', e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                disabled={copyBreakfast && day !== 'Saturday'}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Lunch:</label>
              <input
                type="text"
                value={meals[day].lunch}
                onChange={(e) => handleInputChange(day, 'lunch', e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                disabled={copyLunch && day !== 'Saturday'}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Dinner:</label>
              <input
                type="text"
                value={meals[day].dinner}
                onChange={(e) => handleInputChange(day, 'dinner', e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                disabled={copyDinner && day !== 'Saturday'}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Week button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmitWeek}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Add Week
        </button>
      </div>
    </div>
  );
}

export default MyWeek;
