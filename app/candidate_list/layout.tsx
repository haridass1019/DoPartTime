"use client";

import Link from "next/link";

export default function DashboardLayout({ children }: any) {
    return (
        <>
            <div className="jobsearch-wrapper">
                <div className="jobsearch-bg-widget flex flex-col">
                    <div className="job-heading-card">
                        <h2 className="job-count-heading">Over 2,000+ part-time jobs available in</h2>
                        <div className="text-center"><span className="job-location-heading">Egmore, Chennai</span> <Link style={{ color: "#fff", fontWeight: 500, fontSize: "14px", textDecorationLine: "underline" }} href="#">Change</Link></div>
                    </div>
                </div>
            </div>
            <div className="my-5 flex">
                <div className="filter-side-bar me-4 w-[224px]">
                    <div className="mt-4">
                        <h2 className="filter-side-bar_item-title">Preferred Location </h2>
                        <ul className="filter-side-bar_item-row" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="4" type="checkbox" className="" />
                                    <label htmlFor="4" className="w-full">Employer location</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="5" type="checkbox" className="" />
                                    <label htmlFor="5" className="w-full">Field work</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="6" type="checkbox" className="" />
                                    <label htmlFor="6" className="w-full">Work from home</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h2 className="filter-side-bar_item-title">Timing</h2>
                        <ul className="filter-side-bar_item-row" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="7" type="checkbox" className="" />
                                    <label htmlFor="7" className="w-full">Morning</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="8" type="checkbox" className="" />
                                    <label htmlFor="8" className="w-full">Afternoon</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="9" type="checkbox" className="" />
                                    <label htmlFor="9" className="w-full">Evening</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="10" type="checkbox" className="" />
                                    <label htmlFor="10" className="w-full">Night</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h2 className="filter-side-bar_item-title">Gender </h2>
                        <ul className="filter-side-bar_item-row" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="7" type="checkbox" className="" />
                                    <label htmlFor="7" className="w-full">All</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="5" type="checkbox" className="" />
                                    <label htmlFor="5" className="w-full">Male</label>
                                </div>
                            </li>
                            <li className="w-full">
                                <div className="flex items-center mb-2">
                                    <input id="6" type="checkbox" className="" />
                                    <label htmlFor="6" className="w-full">Female</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="cmp-list-card flex-1">
                    <div className="">{children}</div>
                </div>
            </div>
        </>
    );
}