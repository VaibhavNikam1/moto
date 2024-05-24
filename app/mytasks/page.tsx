import { Dashboard } from '@/components/Dashboard';
import Header from '@/components/Header/Header';
import { Hero } from '@/components/Hero';
import { Leftmenu } from '@/components/Leftmenu';
import TaskList from '@/components/TaskList';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/dist/client/link';
import { redirect } from 'next/navigation';

export default async function Index() {


    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    
    if (!session) 
    {
        redirect('/');
        return null;
    }

    // fetch here 
    const user_id = session.user.id;

    // Fetch data from the 'tasks' table using user_id
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user_id);

    //     const handleDelete = async (taskId) => {
    //       const response = await fetch('/api/deleteTask', {
    //           method: 'DELETE',
    //           headers: {
    //               'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ taskId }),
    //       });
  
    //       if (response.ok) {
    //           // Refresh the page or update the state to reflect the deletion
    //           window.location.reload();
    //       } else {
    //           console.error('Failed to delete the task');
    //       }
    //   };
    const handleDelete = async (taskId: string) => {
        const response = await fetch('/api/deleteTask', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskId, user_id }),
        });
      
        if (!response.ok) {
          // Handle error
          console.error('Failed to delete the task');
          return;
        }
      
        // Task deletion was successful
         window.location.reload();

        console.log('Task deleted successfully');
      };

      return (
        session && (
            <div>
                <Header />
                <div className="flex">
                    <Leftmenu />
                    <div className="w-full p-4">
                        <TaskList initialData={data} />
                    </div>
                </div>
            </div>
        )
    );

    // return (
    //     session && (
    //         <div>
    //   <Header />
    //   <div className='flex'>
    //     <Leftmenu />
    //     <div className='w-full p-4'>
    //       <table className='min-w-full bg-black border'>
    //         <thead>
    //           <tr>
    //             <th className='py-2 px-4 border-b'>ID</th>
    //             <th className='py-2 px-4 border-b'>Task Name</th>
    //             <th className='py-2 px-4 border-b'>Description</th>
    //             <th className='py-2 px-4 border-b'>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {data.map((task) => (
    //             <tr key={task.id}>
    //               <td className='py-2 px-4 border-b'>{task.id}</td>
    //               <td className='py-2 px-4 border-b'>{task.name}</td>
    //               <td className='py-2 px-4 border-b'>{task.description}</td>
                  
    //               <td className='py-2 px-4 border-b'>
    //               <button  className='text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded-md px-3 py-1 m-1'>
    //                   Edit
    //                 </button>
                    
    //                 <button className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 rounded-md px-3 py-1 m-1'
    //                 onClick={() => handleDelete(task.id)}>
    //                   Delete
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
        
    //   </div>
    // </div>
    //     )
      
    //   );
 
}
