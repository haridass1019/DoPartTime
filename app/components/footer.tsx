'use client'

import Link from "next/link";

export default function Footer() {
    return (
        <>
        <footer>
                <div className="container my-4 homepage-wrapper">
                    <div className="flex justify-between">
                        <div className="basis-1/4">
                            <h4 className="mb-2 text-sm footer-title">DoPartTime.com</h4>    
                            <p className="text-xs" style={{lineHeight:"20px", color:"#808080"}}>DoPartTime.com is an online marketplace that connects employers with individuals seeking part-time, temporary, contract, micro, or one-time job opportunities. Users can list and find various types of openings tailored to flexible work arrangements.</p>
                        </div>
                        <div className="basis-1/6">
                            <h4  className="mb-2 text-sm footer-title">Jobs by timing</h4>       
                            <ul className="footer-menu">
                                <li>
                                    <Link className="text-xs" href="#">Morning</Link>                                    
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Afternoon</Link>
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Evening</Link>
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Night</Link>
                                </li>
                            </ul>          
                        </div>
                        <div className="basis-1/6">
                            <h4  className="mb-2 text-sm footer-title">Jobs by work place</h4>     
                            <ul className="footer-menu">
                                <li>
                                    <Link className="text-xs" href="#">Work From Home</Link>                                    
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Employer Location</Link>
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Typing Jobs</Link>
                                </li>
                            </ul>            
                        </div>
                        <div className="basis-1/6">
                            <h4  className="mb-2 text-sm footer-title">Jobs by Category </h4>     
                            <ul className="footer-menu">
                                <li>
                                    <Link className="text-xs" href="#">Online Jobs</Link>                                    
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Delivery Jobs</Link>
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Typing Jobs</Link>
                                </li>
                                <li>
                                    <Link className="text-xs" href="#">Data Entry Jobs</Link>
                                </li>
                            </ul>            
                        </div>
                    </div>
                </div>        
                <div className="footer-quick-menu text-center">
                    <Link href="#">Contact Us</Link>
                    <span> . </span>
                    <Link href="#">About Us</Link>
                    <span> . </span>
                    <Link href="#">Privacy Policy</Link>
                </div>
                <div className="text-xs container font-semibold mx-auto my-4 text-center">
                    © Copyright 2024 Tinywall Technologies
                </div>
        </footer>
        </>
    );
}