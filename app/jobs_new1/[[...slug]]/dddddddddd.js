import { db } from "../../firbaseconfig";
import { collection, endAt, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
let pagination_size = 2;
const getData = async (page: any, count: boolean, lastVisible: boolean, lastid: any, location: any, area: any) => {
    try {
        const queryConstraints = [];
        if (location) {
            queryConstraints.push(where('location', '==', location));

        }
        if (area) {
            queryConstraints.push(where('area', '==', area));
        }

        if (page >= 2 && (!count || !lastVisible)) {
            if (lastid != "") {
                queryConstraints.push(startAfter(lastid));
            }
        }
        if (!count) {
            queryConstraints.push(limit((page >= 2) ? pagination_size * (page - 1) : pagination_size));
        }

        const postsRef = query(collection(db, "jobs"), ...queryConstraints);
        const querySnapshot = await getDocs(postsRef);
        if (lastVisible == true) {
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            return lastVisible;
        }

        const promises = querySnapshot.docs.map(async (doc) => {
            let data: any;
            data = { id: doc.id, ...doc.data(), };
            return data
        });

        const dataArray = await Promise.all(promises);
        const data = dataArray.filter(Boolean); // Remove any undefined elements

        console.log(data);
        return data;
    } catch (error: any) {
        throw new Error("Failed to fetch data from Firestore: " + error.message);
    }
};


function formatTimeRange(start_time: any, end_time: any) {
    if (!start_time || !start_time.seconds || !end_time || !end_time.seconds) {
        return "Time not mentioned";
    }
    const options: any = { hour: "numeric", minute: "numeric", hour12: true };
    const startDate = new Date(start_time.seconds * 1000);
    const endDate = new Date(end_time.seconds * 1000);

    const formattedStartTime = startDate.toLocaleTimeString("en-US", options);
    const formattedEndTime = endDate.toLocaleTimeString("en-US", options);

    return `${formattedStartTime} - ${formattedEndTime}`;
}
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
        return "Posted today";
    } else if (daysDifference === 1) {
        return "Posted 1 day ago";
    } else {
        return `Posted ${daysDifference} days ago`;
    }
}
type Props = {
    params1: {
        slug: string[];
    };
};

const dashboard: any = async (params: any) => {
    try {
        // console.log("params", params.searchParams);
        // console.log("segment", params.params.slug[0]);
        let tiltle = '';
        let location = '';
        let area = '';
        let tagvalue = '';
        let company = '';

        let start = 0;
        let end = 0;
        let page = 1;

        const job_type = [];
        // console.log((params.params.slug[0] != "tag"));
        if (params.params.slug && params.params.slug[0] && params.params.slug[0] != "tag" && params.params.slug[0] != "company") {
            location = params.params.slug[0];
        }
        if (params.params.slug && params.params.slug[1] && params.params.slug[0] != "tag" && params.params.slug[0] != "company") {
            area = params.params.slug[1];
        }
        if (params.params.slug && params.params.slug[0] && params.params.slug[0] == "tag" && params.params.slug[0] != "company") {
            if (params.params.slug && params.params.slug[2]) {
                location = params.params.slug[2];
            }
            if (params.params.slug && params.params.slug[3]) {
                area = params.params.slug[3];
            }
            tagvalue = params.params.slug[1];
        }
        if (params.params.slug && params.params.slug[0] == "company") {
            company = params.params.slug[1];
        }
        if (params.searchParams.location) {
            location = params.searchParams.location;
        }
        if (params.searchParams.area) {
            area = params.searchParams.area;
        }
        if (params.searchParams.company) {
            company = params.searchParams.company;
        }
        if (params.params.slug && params.params.slug[0] && params.params.slug[0] == "tag") {
            tagvalue = params.params.slug[1];
        }
        if (params.searchParams.tag) {

            job_type.push(params.searchParams.tag);
        }
        if (params.searchParams.jobs_type) {
            let values1 = params.searchParams.jobs_type.split(',');
            for (let index = 0; index < values1.length; index++) {
                job_type.push(values1[index]);
            }

        }
        if (params.searchParams.page) {
            page = params.searchParams.page;
        }
        if (params.searchParams.jobs_days) {
            let values2 = params.searchParams.jobs_days.split(',');
            for (let index = 0; index < values2.length; index++) {
                job_type.push(values2[index]);
            }

        }
        if (params.searchParams.jobs_time_period) {
            let values3 = params.searchParams.jobs_time_period.split(',');
            for (let index = 0; index < values3.length; index++) {
                job_type.push(values3[index]);
            }

        }

        // if (params.searchParams.end) {
        //   end = params.searchParams.end;
        // }
        let lastid = await getData(page, false, true, "", "", "");
        let apiData: any = await getData(page, false, false, lastid, location, area);
        let apiDatacount: any = await getData(page, true, false, "", location, area);
        return (
            <>
                <div className="h-full">
                    <div className="Fillter">
                        <div className="header wrapper">
                        </div>
                        <span>{apiDatacount.length} job matches found </span>
                        <div className="Fillter-wrapper">

                            <div className="Fillter-right">

                                <div className="body">
                                    {apiData.map((message: any, index: any) => (

                                        <div className="job-wrpper" key={index.id}>

                                            <Link href={`/Pages/Jobs/Job-details/${message.id}`}>
                                                <div className="job-header">
                                                    {message.image ? (
                                                        <Image
                                                            src={message.image}
                                                            width={32}
                                                            height={32}
                                                            alt="Company"
                                                        />
                                                    ) : (
                                                        <Image
                                                            src="https://flowbite.com/docs/images/logo.svg"
                                                            width={32}
                                                            height={32}
                                                            alt="Default Company Logo"
                                                        />
                                                    )}
                                                    <div>
                                                        <p>{message.title}</p>
                                                        <span>{message.title}</span>
                                                    </div>
                                                </div>
                                                <div className="job-body">
                                                    <Image
                                                        src="/icon/map-pin.svg"
                                                        width={16}
                                                        height={16}
                                                        alt="Logo"
                                                    />
                                                    <span> {message.location}</span>
                                                </div>
                                                <div className="job-body">
                                                    <Image
                                                        src="/icon/clock.svg"
                                                        width={16}
                                                        height={16}
                                                        alt="Logo"
                                                    />
                                                    <span>
                                                        {formatTimeRange(
                                                            message.start_time,
                                                            message.end_time
                                                        )}{" "}
                                                        {message.working_days}
                                                    </span>
                                                </div>
                                                <div className="job-body">
                                                    <Image
                                                        src="/icon/wallet.svg"
                                                        width={16}
                                                        height={16}
                                                        alt="Logo"
                                                    />
                                                    <span>
                                                        ₹ {message.start_salary} - {message.end_salary} per
                                                        month
                                                    </span>
                                                </div>
                                                <div className="postby">
                                                    <span>{formatPostedTime(message.publish_time)}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                    <div className="paggination-head">
                                        {/* <Link className="pagination"
                      style={{
                        pointerEvents: (start == 0) ? "none" : "auto",
                      }}
                      href={{
                        pathname: '/jobs',
                        query: {
                          ...params.searchParams,
                          start: start - 3,
                          end: end - 3,

                        }
                      }}
                    >
                      Previous
                    </Link> */}
                                        {Array.from({ length: Math.ceil(apiDatacount.length / pagination_size) }, (_, index) => (

                                            (apiDatacount.length) > pagination_size && (
                                                <Link key={index} className="pagination"
                                                    href={{
                                                        pathname: '/jobs_new1',
                                                        query: {
                                                            ...params.searchParams,
                                                            page: index + 1,

                                                        }
                                                    }}
                                                >
                                                    {index + 1}
                                                </Link>
                                            )


                                        ))}
                                    </div>
                                    {/* <Link className="pagination"
                    href={{
                      pathname: '/jobs',
                      query: {
                        ...params.searchParams,
                        start: start + 2,
                        end: start + 4,

                      }
                    }}
                  >
                    Next
                  </Link> */}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    } catch (error: any) {
        console.error(error);
        return (
            <>
                <h2>Profile</h2>
                <div>Error fetching data: {error.message}</div>
            </>
        );
    }
};

export default dashboard;

