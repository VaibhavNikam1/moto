import { Link } from 'react-router-dom';
import { AuthButtons } from './AuthButtons';

export const Dashboard = () => {
  return (
    <>
    <div className='flex justify-center border w-full'>
      <div>
        <h1 className='text-center mt-5'>Welcome to the dashboard</h1>
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-5 w-full" role="alert">
            <strong className="font-bold">Information:</strong><br />
            <p className="block sm:inline">1) You want to create new task  you can click Create Task button</p><br />
            <p className="block sm:inline">2) You want to see your task click on your task button .</p><br />
            <p className="block sm:inline">3) You want to see your team membes task you can click on Teams task</p><br />
            <h1 className="text-center mt-5">Thank you ...</h1><br />
        </div>
      </div>
    </div>
    </>
  );
};
