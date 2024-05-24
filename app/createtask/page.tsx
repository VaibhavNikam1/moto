import { Dashboard } from '@/components/Dashboard';
import Header from '@/components/Header/Header';
import { Hero } from '@/components/Hero';
import { Leftmenu } from '@/components/Leftmenu';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

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

    // const { data: teams, error: teamError } = await supabase
    // .from('teams')
    // .select('*');
    
    const { data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('user_id', session.user.id)
    .single(); 

    if (teamError) {
      console.error('Error fetching team data:', teamError);
      return;
    }


    const task = async (formData: FormData) => {
        'use server';
    
        const origin = headers().get('origin');

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const user_id = formData.get('user_id') as string;
        const team = formData.get('team') as string;
        const supabase = createClient();
        
        

        const { error } = await supabase
        .from('tasks')
        .insert([
          { name: name, description: description, user_id: user_id , team: team},
        ]);


        
  
      if (error) {
        console.error('Error inserting data:', error);
        return;
      }
  
      redirect('/mytasks');
      };
    


    return (
        session && (
            <div>
            <Header />
            <div className='flex'>
            <Leftmenu />
            <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
                <form
            className="flex flex-col w-full justify-center gap-2 text-foreground mb-4"
            action={task}
            >
            <label className="text-md" htmlFor="name">
                Task Name
            </label>
            <input type="text" name="name" id='name' className="rounded-md px-4 py-2 bg-inherit border mb-6"/>
            
            <label className="text-md" htmlFor="description">
                Task description
            </label>
            
            <textarea name="description" id="" placeholder='Enter your task description'
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            >
            </textarea>


            <input type="hidden" name="user_id" value={session.user.id}/>
            {team ? (
              <input type="hidden" name="team" id="" value={team.team} />
            ) : (
                <p>No team data available for this user. please select team (/team)</p>
              )}
            <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
                Create task
            </button>

                </form>

            </div>
            </div>
          </div>
        )
      
      );
 
}
