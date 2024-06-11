import Link from "next/link";
import Image from "next/image";

export default function companyList() {
  return (
    <>
      <div className="com-list-card-row">
        <Link href={`/company_detail/aspect-solution`}>
          <div className="company-title-row flex items-start">

            <Image src="https://flowbite.com/docs/images/logo.svg" width={66} height={66} alt="Default Company Logo" />

            <div className="ms-2 w-full flex-1 text-white">
              <h2 className='company-title'>Redditch Accessories</h2>
              <div className="company-loc mb-2">Egmore, Chennai</div>
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
      <div className="com-list-card-row">
        <Link href={`/company_detail/aspect-solution`}>
          <div className="company-title-row flex items-start">

            <Image src="https://flowbite.com/docs/images/logo.svg" width={66} height={66} alt="Default Company Logo" />

            <div className="ms-2 w-full flex-1 text-white">
              <h2 className='company-title'>Redditch Accessories</h2>
              <div className="company-loc mb-2">Egmore, Chennai</div>
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
      <div className="com-list-card-row">
        <Link href={`/company_detail/aspect-solution`}>
          <div className="company-title-row flex items-start">

            <Image src="https://flowbite.com/docs/images/logo.svg" width={66} height={66} alt="Default Company Logo" />

            <div className="ms-2 w-full flex-1 text-white">
              <h2 className='company-title'>Redditch Accessories</h2>
              <div className="company-loc mb-2">Egmore, Chennai</div>
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
      <div className="com-list-card-row">
        <Link href={`/company_detail/aspect-solution`}>
          <div className="company-title-row flex items-start">

            <Image src="https://flowbite.com/docs/images/logo.svg" width={66} height={66} alt="Default Company Logo" />

            <div className="ms-2 w-full flex-1 text-white">
              <h2 className='company-title'>Redditch Accessories</h2>
              <div className="company-loc mb-2">Egmore, Chennai</div>
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
      <div className="com-list-card-row">
        <Link href={`/company_detail/aspect-solution`}>
          <div className="company-title-row flex items-start">

            <Image src="https://flowbite.com/docs/images/logo.svg" width={66} height={66} alt="Default Company Logo" />

            <div className="ms-2 w-full flex-1 text-white">
              <h2 className='company-title'>Redditch Accessories</h2>
              <div className="company-loc mb-2">Egmore, Chennai</div>
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
    </>
  );
}