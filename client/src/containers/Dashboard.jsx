import { useQuery } from '@apollo/client';
import { GET_WEEKS } from '../graphql/queries';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { loading, error, data } = useQuery(GET_WEEKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const weeks = data?.weeks || [];
console.log(weeks);
  return (
    <div className="dashboard p-6 h-screen overflow-y-auto">
      <h2 className="gloock-regular text-3xl text-green-900 font-bold mb-6 text-center">Dashboard</h2>

      {/* Weeks Container */}
      {weeks.map((week, index) => (
        <div key={index} className="mb-8">
          {/* Header for Week of */}
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              Week of {week.weekStart} - {week.weekEnd}
            </h3>

            <span>
              <Link to={`/myweek/${week._id}`} className="text-green-900 underline">Edit</Link>
              <button className="text-red-500 underline ml-2">Delete</button>
            </span>
          </div>

          {/* Days of the Week Header */}
          <div className="sticky top-0 bg-white z-10 grid grid-cols-7 gap-4 py-2 border-b border-gray-300 shadow">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700">
                {day}
              </div>
            ))}
          </div>

          {/* Weekly Grid */}
          <div className="grid grid-cols-7 gap-4 h-96"> {/* Adjust height as needed */}
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="bg-gray-50 border rounded-lg p-4 hover:bg-gray-100 transition relative">
                {/* Day Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-start space-y-6 text-center">
                  <h4 className="font-bold text-lg">{day}</h4>
                  <p className="text-sm"><strong>Breakfast:</strong> {week.meals[day].breakfast}</p>
                  <hr className="my-2 border-gray-300"/>
                  <p className="text-sm"><strong>Lunch:</strong> {week.meals[day].lunch}</p>
                  <hr className="my-2 border-gray-300"/>
                  <p className="text-sm"><strong>Dinner:</strong> {week.meals[day].dinner}</p>
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
