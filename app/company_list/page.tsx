import Link from "next/link";
import Image from "next/image";
import getData from "./getdata";

export default async function companyList() {
  let apiData: any = await getData({});
  return (
    <>
      {apiData.map((data: any, index: any) => (
        <div className="com-list-card-row">
          <Link href={`/company_detail/${data.id}`}>
            <div className="company-title-row flex items-start">

              <Image src={data.image} width={66} height={66} alt="Default Company Logo" />

              <div className="ms-2 w-full flex-1 text-white">
                <h2 className='company-title'>{data.name}</h2>
                <div className="company-loc mb-2">{data.location}</div>
                <div className="">
                  <span className='badge-icon' ><Image src="/icon/grow-ic.svg" className='inline mr-1' width={14} height={14} alt="Default Company Logo" />Total 20 Jobs ( Posted 5 jobs in the last month )</span>
                </div>
              </div>
              <div className="w-[120]">
                <span className='cmp-since-lbl'>Active since April 2023</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}