import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_WEEKS } from '../graphql/queries';
import { Link } from 'react-router-dom';
import { UPDATE_WEEK, DELETE_WEEK } from '../graphql/mutations';   ///////////////////////////////////////// When fixed we can add DELETE_WEEK again
import dayjs from 'dayjs';

function Dashboard() {
  const { loading, error, data } = useQuery(GET_WEEKS);
  const [updateWeek] = useMutation(UPDATE_WEEK);
  const [deleteWeek] = useMutation(DELETE_WEEK); 

  const [editableWeek, setEditableWeek] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeks = data?.weeks || [];

  return (
    <div className="dashboard p-6 h-screen overflow-y-auto bg-gray-100">
      <h2 className="gloock-regular text-3xl text-green-900 font-bold mb-6 text-center">Dashboard</h2>

      {/* Weeks Container */}
      {weeks.length !== 0 && weeks.map((week) => (
        <div key={week._id} className="mb-8 bg-white shadow-lg rounded-lg p-6">
          {/* Header for Week of */}
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Week of {dayjs(week.weekStart).format('MM/DD/YYYY')} - {dayjs(week.weekEnd).format('MM/DD/YYYY')}
            </h3>

            <span>
              <Link to={`/myweek/${week._id}`} className="text-green-900 underline hover:text-green-700">Edit</Link>
              <button className="text-red-500 underline ml-4 hover:text-red-700" onClick={() => {
                deleteWeek({variables:{id:week._id}})
                window.location.reload();
                }}>Delete</button>
            </span>
          </div>

          {/* Weekly Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div
                key={`${week._id}-${day}`}
                className="bg-white border border-gray-200 shadow-md rounded-lg p-4 relative transition-all hover:shadow-lg transform hover:scale-105"
              >
                {/* Day Content */}
                <h4 className="font-medium text-lg text-center text-gray-900">{day}</h4>
                
                {/* Divider */}
                <hr className="my-4 border-gray-300" />

                {/* Meals */}
                <div className="text-center">
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Breakfast</label>
                    <p className="text-sm text-gray-900 font-medium">
                      {week.meals[day]?.breakfast || 'No data'}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Lunch</label>
                    <p className="text-sm text-gray-900 font-medium">
                      {week.meals[day]?.lunch || 'No data'}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Dinner</label>
                    <p className="text-sm text-gray-900 font-medium">
                      {week.meals[day]?.dinner || 'No data'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default Dashboard;
