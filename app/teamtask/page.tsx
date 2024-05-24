import { Dashboard } from '@/components/Dashboard';
import Header from '@/components/Header/Header';
import { Hero } from '@/components/Hero';
import { Leftmenu } from '@/components/Leftmenu';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Index() {


    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    
    if (!session) 
    {
        redirect('/login');
        return null;
    }

    const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('user_id', session.user.id)
    .single(); 

    const teamName = team.team;

    const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('*')
    .eq('team', teamName);

    return (
        session && (
            <div>
            <Header />
            <div className='flex'>
            <Leftmenu />
            <div className='flex-1 p-4'>
            <div>
            <h1 className='p-4'>Tasks for Team : <strong>{teamName}</strong></h1>

            </div>
                        <table className='min-w-full bg-black'>
                            <thead>
                                <tr>
                                    <th className='py-2'>Task ID</th>
                                    <th className='py-2'>Title</th>
                                    <th className='py-2'>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            {tasks && tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className='py-2'>{task?.id}</td>
                                    <td className='py-2'>{task?.name}</td>
                                    <td className='py-2'>{task?.description}</td>
                                    <td className='py-2'>{task?.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
            </div>
          </div>
        )
      
      );
 
}
