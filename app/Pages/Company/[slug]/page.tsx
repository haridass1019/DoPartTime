
// "use client"
// import { useEffect, useState } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from './../../../firbaseconfig';
// import Image from 'next/image';
// import Link from "next/link";



// export default function details({ params }: any) {
//   const [companyDetails, setCompanyDetails] = useState<any>(null);

//   useEffect(() => {
//     async function fetchDetails() {
//       if (!params.slug) return;

//        // Company details Start
//       const companyDocRef = doc(db, 'company', params.slug);
//       const companyDocSnap = await getDoc(companyDocRef);
//       if (companyDocSnap.exists()) {
//         setCompanyDetails(companyDocSnap.data());

//         console.log("company details", companyDocSnap.data())
//       } else {
//         console.log('Company details not found!');
//       }
//       // Company details End



//     }
//     fetchDetails();
//   }, [params.slug]);


//   if (!companyDetails) {
//     return <div>Loading...</div>;
//   }
//   return <div>
    
//     <div className="flex min-h-screen flex-col items-center justify-between">

//     <div className="wrapper">

//     <div className="body">

      
//     <div className="job-wrpper details" >
//              <div className="job-header">
//                {companyDetails.logo ? (
//          <Image src={companyDetails.logo} width={32} height={32} alt="Company" />
//        ) : (
//          <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={32} alt="Default Company Logo" />
//        )}
//                <div>
//                  <p>{companyDetails.name}</p>           

//                 <span>{companyDetails.name}</span> 

                 


//                </div>
//              </div>
 
//              <div className="singleline">
//                <div className="job-body">
//                  <Image src="/icon/building-2.svg" width={16} height={16} alt="map" />
//                  <span> {companyDetails.name}</span>
//                </div>
//                <div className="job-body">
//                  <Image src="/icon/map-pin.svg" width={16} height={16} alt="map" />
//                  <span> {companyDetails.location}</span>
//                </div>
//              </div>
 
//            </div>
//            <div className="job-wrpper Requirementscard" >
            
//             <div className="job-body-des pb-4">          
//               <span> About Company</span>
//               <div className="job-body">  
//               <span>{companyDetails.description}</span>
//               </div>
//             </div>
//           </div>

//           <div className="job-wrpper Requirementscard" >
            
//             <div className="job-body-des pb-4">          
//               <span> Contact details</span>
//               <div className="job-body new">  
//               <span>Name - {companyDetails.contact_name}</span>
//               <span>Email - {companyDetails.contact_email}</span>
//               <span>Phone - {companyDetails.contact_mobile}</span> 
//               <span>Website - {companyDetails.website}</span>
//               {/* <p>Address - {companyDetails.contact_name}</p> */}
//               </div>
//             </div>
//           </div>

//     </div>
//     </div>


//     </div>
//   </div>
// }



import { db } from './../../../firbaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';

const company = async ({ params }: any) => {
  const getData = async () => {
    try {
      const docRef = doc(db, 'company', params.slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('User not found');
      }
    } catch (error:any) {
      throw new Error("Failed to fetch data from Firestore: " + error.message);
    }
  };

  try {
    const apiData:any = await getData();
    return (
      <>
        <h2  className="text-center p-10">Company</h2>
        <div>
          <div  key={apiData.id}>
            <div className="flex min-h-screen flex-col items-center justify-between">

     <div className="wrapper">

     <div className="body">

       <div className="job-wrpper details" >
             <div className="job-header">
                {apiData.logo ? (
         <Image src={apiData.logo} width={32} height={32} alt="Company" />
       ) : (
          <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={32} alt="Default Company Logo" />
        )}
               <div>
                  <p>{apiData.name}</p>           

                 <span>{apiData.name}</span> 

                 


               </div>
             </div>
 
             <div className="singleline">
                <div className="job-body">
                 <Image src="/icon/building-2.svg" width={16} height={16} alt="map" />
                 <span> {apiData.name}</span>
               </div>
               <div className="job-body">
                  <Image src="/icon/map-pin.svg" width={16} height={16} alt="map" />
                 <span> {apiData.location}</span>
               </div>
              </div>
 
           </div>
           <div className="job-wrpper Requirementscard" >
            
            <div className="job-body-des pb-4">          
               <span> About Company</span>
               <div className="job-body">  
               <span>{apiData.description}</span>
              </div>
             </div>
           </div>

          <div className="job-wrpper Requirementscard" >
            
             <div className="job-body-des pb-4">          
              <span> Contact details</span>
               <div className="job-body new">  
               <span>Name - {apiData.contact_name}</span>
              <span>Email - {apiData.contact_email}</span>
              <span>Phone - {apiData.contact_mobile}</span> 
              <span>Website - {apiData.website}</span>
               {/* <p>Address - {companyDetails.contact_name}</p> */}
               </div>
            </div>
          </div>

     </div>
     </div>


     </div>
          </div>
        </div>
      </>
    );
  } catch (error:any) {
    console.error(error);
    return (
      <>
        <h2>Company</h2>
        <div>Error fetching data: {error.message}</div>
      </>
    );
  }
};

export default company;
