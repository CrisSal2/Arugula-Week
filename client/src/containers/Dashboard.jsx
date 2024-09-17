import { useQuery, gql } from '@apollo/client';
import { GET_WEEKS } from '../graphql/queries';


function Dashboard() {
  
  const { loading, error, data } = useQuery(GET_WEEKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeks = data?.weeks || [];

  return (
    <div className="dashboard">
      <h2 className="gloock-regular text-3xl text-green-900 font-bold mb-6 text-center">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeks.map((week, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold mb-4">
              Week: {week.weekStart} - {week.weekEnd}
            </h3>
            <div className="mb-2">
              <strong>Sunday:</strong>
              <p>Breakfast: {week.meals.Sunday.breakfast}</p>
              <p>Lunch: {week.meals.Sunday.lunch}</p>
              <p>Dinner: {week.meals.Sunday.dinner}</p>
            </div>
            <div className="mb-2">
              <strong>Monday:</strong>
              <p>Breakfast: {week.meals.Monday.breakfast}</p>
              <p>Lunch: {week.meals.Monday.lunch}</p>
              <p>Dinner: {week.meals.Monday.dinner}</p>
            </div>
            <div className="mb-2">
              <strong>Tuesday:</strong>
              <p>Breakfast: {week.meals.Tuesday.breakfast}</p>
              <p>Lunch: {week.meals.Tuesday.lunch}</p>
              <p>Dinner: {week.meals.Tuesday.dinner}</p>
            </div>
            <div className="mb-2">
              <strong>Wednesday:</strong>
              <p>Breakfast: {week.meals.Wednesday.breakfast}</p>
              <p>Lunch: {week.meals.Wednesday.lunch}</p>
              <p>Dinner: {week.meals.Wednesday.dinner}</p>
            </div>
            <div className="mb-2">
              <strong>Thursday:</strong>
              <p>Breakfast: {week.meals.Thursday.breakfast}</p>
              <p>Lunch: {week.meals.Thursday.lunch}</p>
              <p>Dinner: {week.meals.Thursday.dinner}</p>
            </div>
            <div className="mb-2">
              <strong>Friday:</strong>
              <p>Breakfast: {week.meals.Friday.breakfast}</p>
              <p>Lunch: {week.meals.Friday.lunch}</p>
              <p>Dinner: {week.meals.Friday.dinner}</p>
            </div>
            <div className="mb-2">
              <strong>Saturday:</strong>
              <p>Breakfast: {week.meals.Saturday.breakfast}</p>
              <p>Lunch: {week.meals.Saturday.lunch}</p>
              <p>Dinner: {week.meals.Saturday.dinner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;




























































/* import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_MEAL_PLAN = gql`
  mutation AddMealPlan($name: String!, $description: String!, $imageUrl: String!) {
    addMealPlan(name: $name, description: $description, imageUrl: $imageUrl) {
      id
      name
      description
      imageUrl
    }
  }
`;

function Dashboard() {
  const [meal, setMeal] = useState('');  // For storing the meal title
  const [description, setDescription] = useState('');  // For storing the description
  const [url, setImageUrl] = useState('');
  const [image, setImage] = useState(null);  // For storing the selected image

  const [addMealPlan] = useMutation(ADD_MEAL_PLAN);

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

  return (
    <div>Dashboard</div>
  );
}

export default Dashboard; */
