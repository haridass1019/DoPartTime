import Link from "next/link";
import Image from "next/image";
import getData from "./getData";
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
export default async function candidateList() {
  let apiData: any = await getData({});
  return (
    <>
      {apiData.map((data: any, index: any) => (
        <div key={index} className="com-list-card-row candidate-list-card-row">
          <Link href={`/candidate_detail/${data.id}`}>
            <div className="company-title-row flex items-start">
              <Image src={data.photo_url} width={66} height={66} alt="Default Company Logo" className="candidate-img" />
              <div className="ms-2 w-full flex-1 text-white">
                <h2 className='company-title flex'>{data.display_name}
                  <Image className="ms-2" src="/icon/shield-check.svg" width={24} height={24} alt="shield check" />
                </h2>
                <div className="company-loc mb-2">{data.location}</div>
              </div>
              <div className="w-[120]">
                <span className='cmp-since-lbl'>{formatPostedTime(data.last_login)}</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}