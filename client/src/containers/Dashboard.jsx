import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_WEEKS } from '../graphql/queries';
import { UPDATE_WEEK, DELETE_WEEK } from '../graphql/mutations'; // Assuming you have these mutations ready
import dayjs from 'dayjs';

function Dashboard() {
  const { loading, error, data } = useQuery(GET_WEEKS);
  const [updateWeek] = useMutation(UPDATE_WEEK);
  const [deleteWeek] = useMutation(DELETE_WEEK);

  const [editableWeek, setEditableWeek] = useState(null); // Track the currently edited week

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeks = data?.weeks || [];

  const handleInputChange = (weekId, day, mealType, value) => {
    setEditableWeek((prev) => ({
      ...prev,
      [weekId]: {
        ...prev[weekId],
        meals: {
          ...prev[weekId].meals,
          [day]: {
            ...prev[weekId].meals[day],
            [mealType]: value,
          },
        },
      },
    }));
  };

  const handleUpdateWeek = async (weekId) => {
    const weekToUpdate = editableWeek[weekId];
    try {
      await updateWeek({
        variables: {
          weekId,
          meals: weekToUpdate.meals,
        },
      });
      console.log('Week updated successfully');
    } catch (error) {
      console.error('Error updating week:', error);
    }
  };

  const handleDeleteWeek = async (weekId) => {
    try {
      await deleteWeek({ variables: { weekId } });
      console.log('Week deleted successfully');
    } catch (error) {
      console.error('Error deleting week:', error);
    }
  };

  return (
    <div className="dashboard p-6 h-screen overflow-y-auto">
      <h2 className="gloock-regular text-3xl text-green-900 font-bold mb-6 text-center">Dashboard</h2>

      {/* Weeks Container */}
      {weeks.map((week, index) => (
        <div key={week.id} className="mb-8">
          {/* Header for Week of */}
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Week of {dayjs(week.weekStart).format('MM/DD/YYYY')} - {dayjs(week.weekEnd).format('MM/DD/YYYY')}
            </h3>
          </div>

          {/* Weekly Grid */}
          <div className="grid grid-cols-7 gap-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="bg-gray-50 border rounded-lg p-4 relative">
                {/* Day Content */}
                <h4 className="font-bold text-lg text-center mb-2">{day}</h4>

                <div className="mb-2">
                  <label className="block text-sm font-medium">Breakfast:</label>
                  <input
                    type="text"
                    value={editableWeek?.[week.id]?.meals?.[day]?.breakfast || week.meals[day].breakfast}
                    onChange={(e) => handleInputChange(week.id, day, 'breakfast', e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Lunch:</label>
                  <input
                    type="text"
                    value={editableWeek?.[week.id]?.meals?.[day]?.lunch || week.meals[day].lunch}
                    onChange={(e) => handleInputChange(week.id, day, 'lunch', e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium">Dinner:</label>
                  <input
                    type="text"
                    value={editableWeek?.[week.id]?.meals?.[day]?.dinner || week.meals[day].dinner}
                    onChange={(e) => handleInputChange(week.id, day, 'dinner', e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Update and Delete Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleUpdateWeek(week.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Update Week
            </button>
            <button
              onClick={() => handleDeleteWeek(week.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
            >
              Delete Week
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
