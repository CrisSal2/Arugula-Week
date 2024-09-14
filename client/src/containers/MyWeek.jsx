import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Define GraphQL mutation
const ADD_WEEK = gql`
  mutation AddWeek($meals: WeekInput!, $weekStart: String!, $weekEnd: String!) {
    addWeek(meals: $meals, weekStart: $weekStart, weekEnd: $weekEnd) {
      success
      message
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
  const [url, setImageUrl] = useState('');
  const [image, setImage] = useState(null);  // For storing the selected image

  const [copyBreakfast, setCopyBreakfast] = useState(false);
  const [copyLunch, setCopyLunch] = useState(false);
  const [copyDinner, setCopyDinner] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const [addWeek, { loading, error, data }] = useMutation(ADD_WEEK);

  const handleDateChange = (e) => {
    setSelectedDate(dayjs(e.target.value));
  };

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
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image || !meal || !description) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'pucbutou');

    try {
      const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dbdfjnmds/image/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      setImageUrl(uploadData.secure_url); // Get the image URL

      // Send the meal plan details and image URL to the GraphQL API
      const response = await addMealPlan({ variables: { name: meal, description, imageUrl: uploadData.secure_url } });

      console.log('Meal plan added successfully:', response.data);
      alert('Meal plan added successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add meal plan.');
    }
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
      const variables = {
        meals,
        weekStart: formattedStartOfWeek,
        weekEnd: formattedEndOfWeek,
      };

      const response = await addWeek({ variables });
      if (response.data.addWeek.success) {
        console.log('Week data submitted successfully!');
        // Optionally, reset the form here
      } else {
        console.error('Failed to submit week data:', response.data.addWeek.message);
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
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload image (optional)</span></p>
                  
                </div>
                <input
                  name="image"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
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
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload image</span></p>
                  
                </div>
                <input
                  name="image"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
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
            {/* Upload an image for each meal */}
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                  
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Upload image</span></p>
                  
                </div>
                <input
                  name="image"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
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
          {loading ? 'Submitting...' : 'Add Week'}
        </button>
        {error && <p className="text-red-600 mt-4">{error.message}</p>}
        {data && data.addWeek.success && (
          <p className="text-green-600 mt-4">Week submitted successfully!</p>
        )}
      </div>
    </div>
  );
}

export default MyWeek;
