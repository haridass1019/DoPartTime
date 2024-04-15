


"use client"
import { db } from './firbaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "jobs"));
  const data:any = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export default function Dashboard() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setUserData(data);

   
    }
    fetchData();
  }, []);

  return (
    

    <main className="flex min-h-screen flex-col items-center justify-between">
      <h1>Firebase Data</h1>

      <div className="wrapper">
        <div className="header">   
        </div>
        <div className="body">
        {userData.map((message:any) => (
          <div className="job-wrpper"  key={message.id}>
             <Link href={`Pages/Dashboard/Home/Home-details/${message.id}`}>
            <div className="job-header">
            <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={32} alt="Logo"/>
              <div>                
              <p>{message.title}</p>
              <span>Redditch Accessories</span>
              </div>
            </div>
          
            <div className="job-body">
            <Image src="/icon/map-pin.svg" width={16} height={16} alt="Logo"/>
              <span> {message.location}</span>
            </div>
            <div className="job-body">
            <Image src="/icon/clock.svg" width={16} height={16} alt="Logo"/>
              <span>4:00pm - 7:00pm Mon - Fri</span>
            </div>
            <div className="job-body">
            <Image src="/icon/wallet.svg" width={16} height={16} alt="Logo"/>
              <span>₹ {message.start_salary} - {message.end_salary} per month</span>
            </div>
            <div className="postby">
              <span>Posted 2 days ago</span>
            </div>
            </Link>
          </div>
           ))}
        </div>
      </div>

      <div className="container my-12 mx-auto px-4 md:px-12">
    <div className="flex flex-wrap -mx-1 lg:-mx-4">

    
        
        
    </div>
</div>

  




   
    </main>
  );
}
