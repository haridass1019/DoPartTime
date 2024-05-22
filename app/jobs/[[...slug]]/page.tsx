import { db } from "../../firbaseconfig";
import { collection, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

const getData = async (location: any, area: any, tag: any, company: any, job_type: any, start: number, end: number) => {
  try {

    // const querySnapshot = await getDocs(collection(db, "jobs"));
    // const data: any = [];
    // querySnapshot.forEach((doc) => {
    //   data.push({ id: doc.id, ...doc.data() });
    // });
    // return data;

    const queryConstraints = [];
    let tagid: any;
    if (location) {
      queryConstraints.push(where('location', '==', location));
    }
    if (area) {
      queryConstraints.push(where('area', '==', area));
    }

    if (tag) {
      tagid = await getdocidtag(tag);

      // queryConstraints.push(where('tag', 'in', [tagid]));
    }
    // console.log(queryConstraints)
    const postsRef = query(collection(db, "jobs"), ...queryConstraints);
    const querySnapshot = await getDocs(postsRef);

    // console.log(querySnapshot.size)

    const promises = querySnapshot.docs.map(async (doc) => {
      let data: any;
      const tagset = await getdocgettagid(doc.data().tag);

      if (tag && tagset.includes(tagid)) {
        data = { id: doc.id, ...doc.data() };
      }

      else if (company) {
        const companyvalue = await getdoccompany(doc.data().company, company);
        if (companyvalue) {
          data = { id: doc.id, ...doc.data() };
        }
      }
      else if (!tag && job_type.length <= 0) {
        data = { id: doc.id, ...doc.data() };
      }

      if (job_type) {
        const filtervalue = job_type;
        if (await containsAny(filtervalue, tagset)) {
          data = { id: doc.id, ...doc.data() };
        }

      }
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
async function containsAny(source: any, target: any) {
  var result = source.filter(function (item: any) { return target.indexOf(item) > -1 });
  return (result.length >= 1) ? true : false;
}


async function getdoccompany(company: any, companyvalue: any) {
  let value = false;
  const docSnapshot = await getDoc(company);

  if (docSnapshot.exists() && docSnapshot.id === companyvalue) {
    value = true;
  }
  return value;
}
async function getdocgettagid(tag: any) {
  const documentValues = [];
  for (const docRef of tag) {
    try {

      const docSnapshot = await getDoc(docRef);


      if (docSnapshot.exists()) {

        documentValues.push(docRef.id);
      } else {
        console.log(`Document does not exist for reference: ${docRef.id}`);
      }
    } catch (error) {
      console.error(`Error fetching document: ${docRef.id}`, error);
    }
  }

  return documentValues;
}
async function getdocidtag(tag: any) {
  const postsQuery1 = query(collection(db, "master_tag"), where('name', '==', tag), limit(1));
  const querySnapshot1 = await getDocs(postsQuery1);
  console.log(querySnapshot1);
  if (querySnapshot1.size >= 1) {
    const document = querySnapshot1.docs[0];
    return document.id;
  }
}
async function getdocidtagfilter(tag: any) {
  let values = [];
  for (let index = 0; index < tag.length; index++) {
    const postsQuery1 = query(collection(db, "master_tag"), where('name', '==', tag[index]), limit(1));
    const querySnapshot1 = await getDocs(postsQuery1);
    if (querySnapshot1.size >= 1) {
      const document = querySnapshot1.docs[0];
      values.push(document.id);
    }
  }
  return values;
}
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
    let location = '';
    let area = '';
    let tagvalue = '';
    let company = '';
    let pagination_size = 2;
    let start = 0;
    let end = pagination_size;
    const job_type: any = [];
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
    if (params.searchParams.tag) {

      job_type.push([params.searchParams.tag]);
    }
    if (params.searchParams.jobs_type) {

      job_type.push(params.searchParams.jobs_type.split(','));
    }
    if (params.searchParams.jobs_days) {
      job_type.push(params.searchParams.jobs_days.split(','));
    }
    if (params.searchParams.jobs_time_period) {
      job_type.push(params.searchParams.jobs_time_period.split(','));
    }
    if (params.searchParams.start) {
      start = params.searchParams.start;
    }
    if (params.searchParams.end) {
      end = params.searchParams.end;
    }
    let apiData = await getData(location, area, tagvalue, company, (job_type && job_type[0] && job_type[0].length >= 1) ? job_type[0] : job_type, start, end);
    if (params.searchParams.title) {
      console.log('-------');
      console.log(apiData);
      apiData = apiData.filter((item: any) => {
        // for (var key in params.searchParams) {
        //   console.log("testing",key)
        //   console.log(params.searchParams[key],item[key])
        //   if (item[key]?.toLowerCase().includes(params.searchParams[key])) continue;
        //   else return false
        // }
        const keys = Object.keys(params.searchParams);
        for (let i = 0; i < 1; i++) {
          const key = keys[i];
          const searchValue = params.searchParams[key]?.toLowerCase();
          console.log(searchValue);
          if (searchValue && item[key]?.toLowerCase().includes(searchValue) || item['description'].toLowerCase().includes(searchValue) || item['location'].toLowerCase().includes(searchValue)) {
            continue;
          } else { return false; }
        }

        return true;
      });

      // let result = Object.keys(params.searchParams).map((key) => [key, params.searchParams[key]]);
      // console.log("result",result)

    }

    let values_filter = apiData.slice(start, end);


    return (
      <>
        <div className="h-full">
          <div className="Fillter">
            <div className="header wrapper">
            </div>
            <span>{apiData.length} job matches found </span>
            <div className="Fillter-wrapper">

              <div className="Fillter-right">

                <div className="body">
                  {values_filter.map((message: any, index: any) => (

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
                    {Array.from({ length: apiData.length / pagination_size }, (_, index) => (
                      <Link key={index} className="pagination"
                        href={{
                          pathname: '/jobs',
                          query: {
                            ...params.searchParams,
                            start: (index == 0) ? 0 : index + 2,
                            end: (index == 0) ? 2 : index + 4,

                          }
                        }}
                      >
                        {index + 1}
                      </Link>

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

