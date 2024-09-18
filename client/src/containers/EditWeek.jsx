import React, { useState, useEffect } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { GET_WEEK } from '../graphql/queries';
import { UPDATE_WEEK } from '../graphql/mutations';

dayjs.extend(isoWeek);

// Helper function to remove __typename
function removeTypename(obj) {
    if (Array.isArray(obj)) {
      return obj.map(removeTypename);
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        if (key !== '__typename') {
          newObj[key] = removeTypename(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  }


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



function EditWeek() {
  const [meals, setMeals] = useState({
    Sunday: { breakfast: '', lunch: '', dinner: '' },
    Monday: { breakfast: '', lunch: '', dinner: '' },
    Tuesday: { breakfast: '', lunch: '', dinner: '' },
    Wednesday: { breakfast: '', lunch: '', dinner: '' },
    Thursday: { breakfast: '', lunch: '', dinner: '' },
    Friday: { breakfast: '', lunch: '', dinner: '' },
    Saturday: { breakfast: '', lunch: '', dinner: '' },
  });


  
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [copyBreakfast, setCopyBreakfast] = useState(false);
  const [copyLunch, setCopyLunch] = useState(false);
  const [copyDinner, setCopyDinner] = useState(false);
  const { id } = useParams();
  
    const { loading, error, data } = useQuery(GET_WEEK, { variables: { id: id } });
    const [updateWeek] = useMutation(UPDATE_WEEK);

  const navigate = useNavigate();

    useEffect(() => {
    if (data) {
        const { weekStart, meals } = data.week;
        setSelectedDate(dayjs(weekStart));
        setMeals(meals);
    }
    }, [data]);

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
    const cleanedMeals = removeTypename(meals);  // Clean the meals object

  const variables = {
    meals: cleanedMeals,
    weekStart: formattedStartOfWeek,
    weekEnd: formattedEndOfWeek,
  };

  try {
    await updateWeek({ variables: { id, ...variables } });
    navigate('/dashboard');
  } catch (error) {
    console.error('Error updating week:', error);
  }
};

  return (
    <div className="montserrat text-green-900 px-4 sm:px-8 lg:px-64">
      <div className="text-center mb-6">
        <h2 className="gloock-regular text-3xl font-bold mb-4">Update Week</h2>
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

      
      <div className="m-8 flex justify-center">
        <button
          onClick={handleSubmitWeek}
          className="gloock-regular px-6 py-2 bg-amber-100 text-green-900 rounded-lg shadow hover:bg-green-900 hover:text-amber-100"
        >
          {loading ? 'Submitting...' : 'Update Week'}
        </button>
        {error && <p className="text-red-600 mt-4">{error.message}</p>}
        {/* {data && <p className="text-green-600 mt-4">Week submitted successfully!</p>} */}
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

export default EditWeek;


