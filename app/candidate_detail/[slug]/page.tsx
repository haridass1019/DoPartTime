import Image from 'next/image';
import Link from "next/link";
import getData from './getdata';
function formatPostedTime(publish_time: any) {
    const timestamp = publish_time;
    const milliseconds =
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    const date = new Date(milliseconds);
    const postDate = new Date(date);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    if (daysDifference === 0) {
        return "Last active today";
    } else if (daysDifference === 1) {
        return "Last active 1 days ago";
    } else {
        return `Last active ${daysDifference} days ago`;
    }
}
const candidateDetail = async ({ params }: any) => {
    let apiData: any = await getData({ slug: params.slug });
    console.log('ssss', apiData);
    try {
        return (
            <>
                <div className="back-btn-row flex justify-between items-center">
                    <Link href="#" className='flex back-btn m-0' style={{ margin: "0 !important" }}> <Image src="/icon/ep_back.svg" className='mr-1' width={24} height={24} alt="Back" />Back</Link>
                    <Link href="#" className=''> <Image src="/icon/share.svg" className='' width={24} height={24} alt="Back" /></Link>
                </div>
                <div className="candidate-detail-wrapper mt-4">
                    <div className="cnd-header-sec flex items-start">
                        <Image src={apiData.userData.photo_url} width={90} height={90} alt="Default Company Logo" />
                        <div className="ms-2 w-full flex-1">
                            <h2 className='cnd-title flex mb-2'>{apiData.userData.display_name}
                                <Image className="ms-2" src="/icon/shield-check.svg" width={24} height={24} alt="shield check" />
                            </h2>
                            <div className="cnd-loc mb-2">{apiData.userData.location}</div>
                            <div className="candidate-sub-title">Job seeker since April 2023</div>
                        </div>
                        <div className="w-[246px] h-[96px] flex flex-col justify-between">
                            <div className='cnd-since-lbl'>{formatPostedTime(apiData.userData.last_login)}</div>
                            <div className="inline-flex justify-between">
                                <Link href={{
                                    pathname: 'https://a-i-gen-project-60pl4r.flutterflow.app/message',
                                    query: { slugref: params.slug }
                                }} className="primary-btn-lg inline-flex justify-between">Send message
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
                        <p className='cnd-card_desc'>{apiData.userData.bio}</p>
                        <div className="flex cnd-rqr-field-row mt-2"><div className="label">Gender</div><div className="value">: {apiData.userData.gender}</div></div>
                        <div className="flex cnd-rqr-field-row mt-2"><div className="label">Available time</div><div className="value">: {apiData.userData.job_day}</div></div>

                    </div>
                    <div className="cnd-card-row">
                        <h2 className="cnd-card_title">Expertise</h2>
                        <div className="flex cnd-rqr-field-row"><div className="label">Education</div><div className="value">: {apiData.userData.education}</div></div>
                        <div className="flex cnd-rqr-field-row">
                            <div className="label">Experience</div>
                            <div className="">
                                {(apiData.userData.experience) && apiData.userData.experience.map((data_ex: any, index: any) => (
                                    <div key={index} className="value mb-2">: {data_ex}</div>

                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="cnd-card-row">
                        <h2 className="cnd-card_title">Skills</h2>
                        <div className="badge-row">
                            {(apiData.userData.skill) && apiData.userData.skill.map((data_skill: any, index: any) => (
                                <span key={index} className="badge-light">{data_skill}</span>

                            ))}

                        </div>
                    </div>
                    <div className="cnd-card-row">
                        <h2 className="cnd-card_title">Interests</h2>
                        <div className="badge-row">
                            {(apiData.userData.interest) && apiData.userData.interest.map((data_interest: any, index: any) => (
                                <span key={index} className="badge-light">{data_interest}</span>

                            ))}

                        </div>
                    </div>
                </div >
            </>
        );
    } catch (error: any) {
        console.error(error);
        return (
            <>
                <h2>Company</h2>
                <div>Error fetching data: {error.message}</div>
            </>
        );
    }
};
export default candidateDetail;
