import Image from 'next/image';
import Link from "next/link";

export default function candidateDetail() {
    return (
        <>
        <div className="back-btn-row flex justify-between items-center">
          <Link href="#" className='flex back-btn m-0'  style={{margin:"0 !important"}}> <Image src="/icon/ep_back.svg" className='mr-1' width={24} height={24} alt="Back" />Back</Link>
          <Link href="#" className=''> <Image src="/icon/share.svg" className='' width={24} height={24} alt="Back" /></Link>          
        </div>
        <div className="candidate-detail-wrapper mt-4">
            <div className="cnd-header-sec flex items-start">
                <Image src="/icon/default-avatar.svg" width={90} height={90} alt="Default Company Logo" />                
                <div className="ms-2 w-full flex-1">
                    <h2 className='cnd-title flex mb-2'>Redditch Accessories 
                        <Image className="ms-2" src="/icon/shield-check.svg" width={24} height={24} alt="shield check" />                              
                    </h2>
                  <div className="cnd-loc mb-2">Egmore, Chennai</div>
                  <div className="candidate-sub-title">Job seeker since April 2023</div>
                </div>
                <div className="w-[246px] h-[96px] flex flex-col justify-between">
                    <div className='cnd-since-lbl'>Last active 3 days ago</div>
                    <div className="inline-flex justify-between">
                            <Link className='primary-btn-lg inline-flex justify-between' href="#">Send message
                                <Image className="ms-8" src="/icon/send-horizontal.svg" width={18} height={18} alt="Send icon" />                               
                            </Link>
                            <Link className='' href="#">
                                <Image className="" src="/icon/phone.svg" width={36} height={36} alt="Send icon" />                               
                            </Link>
                    </div>
                </div>
            </div>
            <div className="cnd-card-row mt-4">
                <h2 className="cnd-card_title">About</h2>
                <p className='cnd-card_desc'>Lorem ipsum dolor sit amet consectetur. Consectetur dignissim non nullam odio maecenas. Sed augue mauris lectus nec. Quam non eget sagittis pellentesque. Turpis massa euismod rhoncus adipiscing nunc sollicitudin leo. Pharetra senectus lacus vel libero dui in donec accumsan.</p>
                <div className="flex cnd-rqr-field-row mt-2"><div className="label">Gender</div><div className="value">: Male</div></div>
                <div className="flex cnd-rqr-field-row mt-2"><div className="label">Available time</div><div className="value">: Evening, Night.</div></div>
                <div className="flex cnd-rqr-field-row mt-2"><div className="label">Language</div><div className="value">: Tamil, English.</div></div>
               
            </div>
            <div className="cnd-card-row">
                <h2 className="cnd-card_title">Expertise</h2>
                <div className="flex cnd-rqr-field-row"><div className="label">Education</div><div className="value">: B.Sc. Mathematics</div></div>
                <div className="flex cnd-rqr-field-row">
                    <div className="label">Experience</div>
                    <div className="">
                        <div className="value mb-2">: Data Entry <span className='badge-light'>2 years</span></div>
                        <div className="value">: Online Admin <span className='badge-light'>1 year</span></div>
                    </div>
                </div> 
            </div>
            <div className="cnd-card-row">
                <h2 className="cnd-card_title">Skills</h2>
                <div className="badge-row">
                    <span className="badge-light">Computer skills</span>        
                    <span className="badge-light">Microsoft Excel</span>        
                    <span className="badge-light">Tag content</span>        
                    <span className="badge-light">Microsoft Office</span>        
                </div>
            </div>
            <div className="cnd-card-row">
                <h2 className="cnd-card_title">Interests</h2>
                <div className="badge-row">
                    <span className="badge-light">Computer skills</span>        
                    <span className="badge-light">Microsoft Excel</span>        
                    <span className="badge-light">Tag content</span>        
                    <span className="badge-light">Microsoft Office</span>        
                </div>
            </div>
        </div>    
        </>
    );
  }