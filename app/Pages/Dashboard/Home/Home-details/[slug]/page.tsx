

// export default function details({params}:any){
//     return <div>
//         <h1>details: {params.slug}</h1>
//     </div>
// }


// pages/details.tsx
"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../../../../firbaseconfig';
import '../../../../../globals.css';

export default function DetailsPage({params}:any) {
  const router:any = useRouter();
//   const {id} = router.query;
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchDetails() {
      if (!params.slug) return;
      const docRef:any = doc(db, 'jobs', params.slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        console.log('No such document!');
      }
    }
    fetchDetails();
  }, [params.slug]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (

 

    <div className="flex min-h-screen flex-col items-center justify-between">
           <div className="wrapper">
       
        <div className="body">
          <div className="job-wrpper" >
            <div className="job-header">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
              <div>                
              <p>{details.title}</p>
              <span>{details.gender}</span>
              </div>
            </div>

            <div className="job-body">
            <img src="/icon/map-pin.svg" className="h-4"/>
              <span> {details.location}</span>
            </div>
            <div className="job-body">
            <img src="/icon/clock.svg" className="h-4"/>
              <span>4:00pm - 7:00pm Mon - Fri</span>
            </div>
            <div className="job-body">
            <img src="/icon/wallet.svg" className="h-4"/>
              <span>₹ {details.start_salary} - {details.end_salary} per month</span>
            </div>
            <div className="postby">
              <span>Posted 2 days ago</span>
            </div>
           
          </div>
          <div className="job-wrpper" >
           
          <div className="job-body-des">          
              <span> description</span>
            </div>
            <div className="job-body">          
              <span> {details.description}</span>
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  );
}
