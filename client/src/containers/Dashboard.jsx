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
  const [image, setImage] = useState(null);  // For storing the selected image
  const [meal, setMeal] = useState('');  // For storing the meal title
  const [description, setDescription] = useState('');  // For storing the description
  const [url, setImageUrl] = useState('');

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
    <div className="min-h-96 flex justify-center items-center">
      <section className="bg-gray-50 dark:bg-gray-900 w-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">New Post</h1>
              <form id="user-form" onSubmit={handleUpload}>
                <div className="my-3">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Meal:</label>
                  <input
                    value={meal}
                    onChange={(e) => setMeal(e.target.value)}
                    name="meal"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    type="text"
                    id="post-title"
                    placeholder="Type here"
                  />

                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
                <div className="my-3">
                  <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="content"
                    placeholder="Type here"
                  />
                </div>
                <div className="my-3">
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
