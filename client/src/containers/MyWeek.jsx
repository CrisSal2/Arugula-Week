import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ADD_WEEK = gql`
  mutation AddWeek($meals: WeekInput!, $weekStart: String!, $weekEnd: String!) {
    addWeek(meals: $meals, weekStart: $weekStart, weekEnd: $weekEnd) {
      weekStart
      weekEnd
      meals {
        Sunday {
          breakfast
          lunch
          dinner
        }
        Monday {
          breakfast
          lunch
          dinner
        }
        Tuesday {
          breakfast
          lunch
          dinner
        }
        Wednesday {
          breakfast
          lunch
          dinner
        }
        Thursday {
          breakfast
          lunch
          dinner
        }
        Friday {
          breakfast
          lunch
          dinner
        }
        Saturday {
          breakfast
          lunch
          dinner
        }
      }
    }
  }
`;

function MyWeek() {
  const [meals, setMeals] = useState({
    Sunday: { breakfast: '', lunch: '', dinner: '' },
    Monday: { breakfast: '', lunch: '', dinner: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '' },
    Friday: { breakfast: '', lunch: '', dinner: '' },
    Saturday: { breakfast: '', lunch: '', dinner: '' },
  });

  const [addWeek, { loading, error, data }] = useMutation(ADD_WEEK);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [copyBreakfast, setCopyBreakfast] = useState(false);
  const [copyLunch, setCopyLunch] = useState(false);
  const [copyDinner, setCopyDinner] = useState(false);
  
  const navigate = useNavigate();

  const startOfWeek = selectedDate.startOf('week');
  const endOfWeek = dayjs(startOfWeek).add(6, 'day');
  const formattedStartOfWeek = startOfWeek.format('MM/DD/YYYY');
  const formattedEndOfWeek = endOfWeek.format('MM/DD/YYYY');

  const handleDateChange = (e) => {
    setSelectedDate(dayjs(e.target.value));
  };

  const handleInputChange = (day, mealType, value) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [day]: { ...prevMeals[day], [mealType]: value },
    }));
  };

  const copyMealToAllDays = (mealType) => {
    const firstDayMeal = meals['Sunday'][mealType];
    setMeals(prevMeals => {
      const updatedMeals = { ...prevMeals };
      daysOfWeek.forEach((day) => {
        if (day !== 'Sunday') {
          updatedMeals[day][mealType] = firstDayMeal;
        }
      });
      return updatedMeals;
    });
  };

  const handleSubmitWeek = async () => {
    const variables = {
      meals,
      weekStart: formattedStartOfWeek,
      weekEnd: formattedEndOfWeek,
    };
  
    try {
      const response = await addWeek({ variables });
      if (response.data) {
        console.log('Week added:', response.data);
  
        // Navigate to /dashboard and reload the page
        navigate('/dashboard', { replace: true });
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding week:', error);
    }
  };

  return (
    <div className="montserrat text-green-900 px-4 sm:px-8 lg:px-64">
      <div className="text-center mb-6">
        <h2 className="gloock-regular text-3xl font-bold mb-4">My Week</h2>
        <input
          type="date"
          value={selectedDate.format('YYYY-MM-DD')}
          onChange={handleDateChange}
          className="border p-2 rounded-md"
        />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl">
          Week of {formattedStartOfWeek} - {formattedEndOfWeek}
        </h2>
      </div>

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
      <div className="m-8 flex justify-center">
        <button
          onClick={handleSubmitWeek}
          className="gloock-regular px-6 py-2 bg-amber-100 text-green-900 rounded-lg shadow hover:bg-green-900 hover:text-amber-100"
        >
          {loading ? 'Submitting...' : 'Add Week'}
        </button>
        {error && <p className="text-red-600 mt-4">{error.message}</p>}
        {data && <p className="text-green-600 mt-4">Week submitted successfully!</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                disabled={copyBreakfast && day !== 'Sunday'}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Lunch:</label>
              <input
                type="text"
                value={meals[day].lunch}
                onChange={(e) => handleInputChange(day, 'lunch', e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                disabled={copyLunch && day !== 'Sunday'}
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Dinner:</label>
              <input
                type="text"
                value={meals[day].dinner}
                onChange={(e) => handleInputChange(day, 'dinner', e.target.value)}
                className="mt-1 block w-full p-2 border rounded-md"
                disabled={copyDinner && day !== 'Sunday'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyWeek;


