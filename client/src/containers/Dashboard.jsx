import React, { useState } from 'react';
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

export default Dashboard;
