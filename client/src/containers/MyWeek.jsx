import React, { useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function MyWeek() {

  const [meals, setMeals] = useState({
    Monday: { breakfast: '', lunch: '', dinner: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '' },
    Friday: { breakfast: '', lunch: '', dinner: '' },
  });

  const handleInputChange = (day, mealType, value) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [day]: { ...prevMeals[day], [mealType]: value },
    }));
  };

  return (
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
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Lunch:</label>
            <input
              type="text"
              value={meals[day].lunch}
              onChange={(e) => handleInputChange(day, 'lunch', e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Dinner:</label>
            <input
              type="text"
              value={meals[day].dinner}
              onChange={(e) => handleInputChange(day, 'dinner', e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>

        </div>
      ))}
    </div>
  );
};

export default MyWeek;