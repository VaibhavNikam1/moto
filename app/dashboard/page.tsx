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

    return (
        session && (
            <div>
            <Header />
            <div className='flex'>
            <Leftmenu />
            <Dashboard/>
            </div>
          </div>
        )
      
      );
 
}
