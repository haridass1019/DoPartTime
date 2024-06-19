"use client"
import { Button } from '@nextui-org/react';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from "next/navigation"; // To get the current route 
import { useState } from 'react';
// import { useState } from 'react';
export default function Navbar() {
    const pathname = usePathname(); // Get the current route 
    // const [isActive, setIsActive] = useState(false);

    // Define menu items with hrefs and label names
    const menuItems = [
      // { href: "/", label: "Home" },
      { href: "/jobs", label: "Jobs" },
      {href:"/candidate_list", label: "Candidates"},  
      {href:"/company_list", label: "Companies"},  
  ];    
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    return (
        <>
        <header>
          {/* <div className="h-[36px]" style={{ backgroundColor: "#DEE0FF", textAlign: 'center', fontSize: "11px", color:"black",fontWeight: 600, padding: "10px 0" }}>🎉 10,000+ people have successfully got part time jobs with DoPartTime  🎉</div> */}
          <nav className="bg-white">
            <div className="navbar-wrapper">
              <div className="relative  h-16 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <Link href="/">
                        <Image src="/Logo/logo.png" width={138} height={34} alt="DoPartTime" />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex items-center space-x-4">
                      <span className="text-black  rounded-md px-3 py-2 text-sm font-semibold">I am looking for</span>
                      <div className="nav-menu-card flex items-center">
                        <div className="nav-menu-card__row flex items-center justify-between">             
                          {menuItems.map((item) => {
                              
                              const isActive = pathname === item.href;
                              const backgroundColor = isActive ? "#2523CA" : "#DEE0FF";
                              const textColor = isActive ? "#FFFFFF" : "#2523CA";
                              const fontWeight = isActive ? "500" : "500";
                              const boxShadow = isActive ? "0px 0px 2px 0px #2523CA8C" : "none";
                              
                              return (

                                  
                                  <div className="" key={item.href}>
                                      <Link style={{ backgroundColor, padding:"6px 24px", borderRadius:"16px", boxShadow }} href={item.href} className="rounded-lg flex items-center">
                                          <span style={{ color: textColor, fontWeight, fontSize:"12px" }} className="">{item.label}</span>                                        
                                      </Link>
                                  </div>
                                
                              );
                          })}
                        </div>
                        <Button onClick={toggleDropdown} className='nav-search-btn rounded bg-primary p-1' isIconOnly color="danger" aria-label="Search">
                          {isOpen ? (
                            <Image src="/Icon/close-ic.svg" width={18} height={18} alt="Search icon" />
                          ) : (
                            <Image src="/Icon/search.svg" width={18} height={18} alt="Search icon" />
                          )
                          }
                        </Button>                                                                                   
                        {isOpen && (
                        <div className="nav-search__input">
                            <input className='nav-search__input-field flex-1' type="text" placeholder='Search' />
                            <Button  className='nav-submit-btn rounded bg-primary p-1' isIconOnly color="danger" aria-label="Search">
                              <Image src="/Icon/search.svg" width={18} height={18} alt="Search icon" />
                          </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="nav-login-btn__card flex justify-between bg-primary p-1 rounded">
                    <Link href="https://a-i-gen-project-60pl4r.flutterflow.app/signup" className='btn-text'>Sign Up </Link>
                    <span className='px-1 btn-text'>/</span>
                    <Link href="https://a-i-gen-project-60pl4r.flutterflow.app/login" className='btn-text'> Log In</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

        </header>
        </>
    );
}