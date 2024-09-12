import React, { useState } from 'react';

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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

  return (
    <div>
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
    </div>
  );
}

export default MyWeek;