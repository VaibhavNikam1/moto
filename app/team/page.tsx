import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header/Header';
import { data } from 'autoprefixer';

export default async function Team({
    searchParams,
  }: {
    searchParams: { message: string };
  }) {

    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();
  
  
    const asTemp = async (formData: FormData) => {
      'use server';
  
      const email = formData.get('email') as string;
      const user_id = formData.get('user_id') as string;
      const team = formData.get('team') as string;
      const supabase = createClient();

      const { error } = await supabase
        .from('teams')
        .insert([
          { email: email, user_id: user_id, team: team },
        ]);
  
      if (error) {
        console.error('Error inserting data:', error);
        return;
      }
  
      redirect('/dashboard');
    };
    return(
        <>
        <div>
        <br />
      <Link
        href="/"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4" 
      >
        Home
      </Link>

      <div className="w-full px-8 sm:max-w-md mx-auto mt-4 border p-5">
      <div className="flex items-center gap-4 my-5">
        Hey, {session.user.email}!
      </div>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          action={asTemp}>
         
          
         <label className="text-md" htmlFor="team">
            Select your Team
         </label>
        <input type="hidden" name="email" value={session.user.email}/>
        <input type="hidden" name="user_id" value={session.user.id}/>

         <select name="team" className="rounded-md px-4 py-2 bg-inherit border mb-6 bg-white text-black" required>
            <option selected disabled>Select Team</option>
            <option value="frontend">Front End</option>
            <option value="backend">Back End</option>
         </select>

          <button className="bg-indigo-700 rounded-md px-4 py-2 text-foreground mb-2">
            Continue
          </button>
        </form>
      </div>
    </div>
        </>
    )

  }