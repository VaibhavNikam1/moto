
import { Link } from 'react-router-dom';
import { AuthButtons } from './AuthButtons';

export const Leftmenu = () => {
  return (
    <>
    <div className="h-screen w-64 bg-black border shadow-md">
      <div className="p-4">
        <ul className="mt-4">
          <li className="mb-2">
              <a href='dashboard' className="block py-2 px-4 rounded hover:bg-gray-200 hover:text-black">Dashboard</a>
          </li>
          <li className="mb-2">
              <a href='/createtask' className="block py-2 px-4 rounded hover:bg-gray-200 hover:text-black">Create task</a>
          </li>
          <li className="mb-2">
              <a href='/mytasks' className="block py-2 px-4 rounded hover:bg-gray-200 hover:text-black">Your task</a>
          </li>
          <li className="mb-2">
              <a href='/teamtask' className="block py-2 px-4 rounded hover:bg-gray-200 hover:text-black">Teams Task</a>
          </li>
        </ul>
      </div>
    </div>
    </>
  );
};
