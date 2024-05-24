import Header from '@/components/Header/Header';
import { Hero } from '@/components/Hero';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


export default async function Index() {


  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  
  if (session) 
  {
      redirect('/dashboard');
      return null;
  }



  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
