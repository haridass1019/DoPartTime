"use client";
import { db } from "../../firbaseconfig";
import { getDocs, collection, query, orderBy, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";



export default function DashboardLayout({ children }: any) {
  console.log('-----------------');
  console.log(children.apiData);
  const router: any = useRouter();



  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedArea, setselectedArea] = useState<string>("");
  const [Selectedjob, setSelectedjob] = useState<string>("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState<string>("");
  const [selectedCompany, setselectedCompany] = useState<string>("");
  const [selectedtag, setselectedtag] = useState<string>("");

  //  filter  side menu start
  const [selectedJobs, setSelectedJobs] = useState<any[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimePeriods, setSelectedTimePeriods] = useState<string[]>([]);

  //  filter  side menu end
  // console.log("url",parames)
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const pathname = usePathname();
  const slug_value = pathname.split('/');
  useEffect(() => {

    if (slug_value.length >= 2 && slug_value[2] != 'tag' && slug_value[2] != 'company') {
      setSelectedLocation(slug_value[2]);
    }
    if (slug_value.length >= 3 && slug_value[2] != 'tag' && slug_value[2] != 'company') {
      setselectedArea(slug_value[3]);
    }
    if (slug_value.length >= 3 && slug_value[2] == 'company') {
      setselectedCompany(slug_value[3]);
    }
    if (slug_value.length >= 3 && slug_value[2] == 'tag') {
      setselectedtag(slug_value[3]);
    }
    if (params.title) {
      setSearchQuery(params.title);
    }
    if (params.location) {
      setSelectedLocation(params.location);
    }
    if (params.area) {
      setselectedArea(params.area);
    }
    if (params.company) {
      setselectedCompany(params.company);
    }
    if (params.tag) {
      setselectedtag(params.tag);
    }
    if (params.jobs_type) {
      const getjobtypes = params.jobs_type.split(',');
      setSelectedJobs(getjobtypes);
    }
    if (params.jobs_days) {
      const getjobs_days = params.jobs_days.split(',');
      setSelectedDays(getjobs_days);
    }
    if (params.jobs_time_period) {
      const getjobs_time_period = params.jobs_time_period.split(',');
      setSelectedTimePeriods(getjobs_time_period);
    }
  }, []);

  console.log(selectedLocation);
  console.log(selectedArea);
  // Type start
  const jobTypes = [
    // { label: "All", value: "" },
    { label: "Employer location", value: "Employer-location" },
    { label: "Field work", value: "Field-work" },
    { label: "Work from home", value: "Work-from-home" },
  ];
  const handleJobTypeChange = (jobType: string) => {
    let updatedSelectedJobs: string[] = [];

    if (jobType === "") {
      updatedSelectedJobs = selectedJobs.length === jobTypes.length ? [] : jobTypes.slice(1).map(job => job.value);
    } else {
      updatedSelectedJobs = selectedJobs.includes(jobType)
        ? selectedJobs.filter(selectedJob => selectedJob !== jobType)
        : [...selectedJobs, jobType];
    }

    setSelectedJobs(updatedSelectedJobs);
    console.log(updatedSelectedJobs.toLocaleString());

    let data = { jobtype: updatedSelectedJobs.toLocaleString(), jobdays: selectedDays, jobs_time_period: selectedTimePeriods }

    handleSearch(data);
    // Log the selected values
  };
  // Type End 


  // Days Start 

  const daysOfWeek = [
    // { label: "All", value: "" },
    { label: "Weekday", value: "Weekday" },
    { label: "Weekend", value: "Weekend" },
    { label: "All days", value: "All-days" },
  ];

  const handleDayChange = (day: string) => {
    let updatedSelectedDays;
    if (day === "") {
      updatedSelectedDays = selectedDays.length === daysOfWeek.length ? [] : daysOfWeek.slice(1).map(d => d.value);
    } else {
      updatedSelectedDays = selectedDays.includes(day)
        ? selectedDays.filter(selectedDay => selectedDay !== day)
        : [...selectedDays, day];
    }
    setSelectedDays(updatedSelectedDays);
    console.log(updatedSelectedDays);
    let data = { jobtype: selectedJobs, jobdays: updatedSelectedDays.toLocaleString(), jobs_time_period: selectedTimePeriods }
    handleSearch(data);// Log the selected values
  };

  // Days End


  // Time start 

  const timePeriods = [
    // { label: "All", value: "" },
    { label: "Morning", value: "Morning" },
    { label: "Afternoon", value: "Afternoon" },
    { label: "Evening", value: "Evening" },
    { label: "Night", value: "Night" },
    { label: "Full day", value: "Full-day" },
    { label: "Flexible", value: "Flexible" },
  ];


  const handleTimePeriodChange = (timePeriod: string) => {
    let updatedSelectedTimePeriods;
    if (timePeriod === "") {
      updatedSelectedTimePeriods = selectedTimePeriods.length === timePeriods.length ? [] : timePeriods.slice(1).map(tp => tp.value);
    } else {
      updatedSelectedTimePeriods = selectedTimePeriods.includes(timePeriod)
        ? selectedTimePeriods.filter(selectedTp => selectedTp !== timePeriod)
        : [...selectedTimePeriods, timePeriod];
    }
    setSelectedTimePeriods(updatedSelectedTimePeriods);
    console.log(updatedSelectedTimePeriods); // Log the selected values

    let data = { jobtype: selectedJobs, jobdays: selectedDays, jobs_time_period: updatedSelectedTimePeriods.toLocaleString() }
    handleSearch(data);
  };
  // Time End 


  // Define the array of salary ranges
  const salaryRanges = [
    { label: "All", value: "" },
    { label: "0-10000", value: "0-10000" },
    { label: "10001-20000", value: "10001-20000" },
    { label: "20001-30000", value: "20001-30000" },
    { label: "30001-40000", value: "30001-40000" },
  ];

  // Function to handle salary range change
  const handleSalaryRangeChange = (range: string) => {
    setSelectedSalaryRange(range);
    let data = { range: range }
    handleSearch(data);
    // handleSearch();
  };

  // Function to render salary range checkboxes
  const renderSalaryRangeCheckboxes = () => {
    return salaryRanges.map((range, index) => (
      <li key={index} className="w-full">
        <div className="flex items-center ps-3">
          <input
            id={`salaryRange-${index}`}
            type="checkbox"
            value={range.value}
            checked={selectedSalaryRange === range.value}
            onChange={() => handleSalaryRangeChange(range.value)}
            className="w-4 h-4"
          />
          <label htmlFor={`salaryRange-${index}`} className="w-full py-3 ms-2">
            {range.label}
          </label>
        </div>
      </li>
    ));
  };


  const handlejobtypeChange = (jobtype: string) => {
    // setSelectedjob(Selectedjob === jobtype ? "" : jobtype);   
    setSelectedjob(jobtype);
    let data = { jobtype: jobtype }
    handleSearch(data);

    console.log("haritype", Selectedjob)
  };

  const handleSearch = async (data?: any) => {

    const queryParams = new URLSearchParams();
    if (searchQuery) {
      queryParams.set("title", searchQuery);
    }
    if (selectedLocation) {
      queryParams.set("location", selectedLocation);
    }
    if (selectedArea) {
      queryParams.set("area", selectedArea);
    }
    if (selectedCompany) {
      queryParams.set("company", selectedCompany);
    }
    if (selectedtag) {
      queryParams.set("tag", selectedtag);
    }
    if (data?.jobtype) {
      queryParams.set("jobs_type", data?.jobtype);
    }
    if (data?.jobdays) {
      queryParams.set("jobs_days", data.jobdays);
    }
    if (data?.jobs_time_period) {
      queryParams.set("jobs_time_period", data.jobs_time_period);
    }
    const queryString = queryParams.toString();
    router.push(`/jobs?${queryString}`);
  };
  const [selectedHomeCityOption, setSelectedHomeCityOption] = useState(null);
  const loadHomeCityOptions = async (inputValue: any, callback: (arg0: any[]) => void) => {
    if (inputValue) {
      try {

        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
        }
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=%28cities%29&key=AIzaSyCzaKDgqmElSIIbKahhFT9vuaqhi_l9icc`

        );

        const data = await response.json();

        let places: any[] = [];
        data?.data?.predictions?.map((place: any, i: any) => {
          places = [
            ...places,
            { value: place.description, label: place.description },
          ];
        });
        callback(places);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const [query, setQuery] = useState('');
  const [key, setKeylocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (input: any) => {
    if (input.length === 0) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://warm-caverns-48629-92fab798385f.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyCzaKDgqmElSIIbKahhFT9vuaqhi_l9icc`
      );

      const data = await response.json();
      let places: any = [];
      data?.predictions?.forEach((place: any) => {
        places.push({ "label": place.description, "value": place.place_id });
      });
      setSuggestions(places);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);
  const getareaandcity = async (key: any) => {
    if (key) {
      const response = await fetch(
        `https://warm-caverns-48629-92fab798385f.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${key}&language=en&key=AIzaSyCzaKDgqmElSIIbKahhFT9vuaqhi_l9icc&type=locality`
      );

      const data = await response.json();

      const city = data.result.address_components.filter((item: any) => {
        if (item.types.includes("locality")) {
          console.log(item);
          setSelectedLocation(item.long_name);
        }
      });
      const area = data.result.address_components.filter((item: any) => {
        if (item.types.includes("sublocality_level_1")) {
          console.log(item);
          setselectedArea(item.long_name);
        }

      });
    }
  }
  const defalut = { jobtype: selectedJobs, jobdays: selectedDays, jobs_time_period: selectedTimePeriods };
  return (
    <section>
      <div className="h-full">
        <div className="Fillter">
          <div className="header wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            />

            <Autocomplete
              className="max-w-xs"
              defaultInputValue={(selectedLocation) ? selectedLocation : (params.area) ? params.area + "," + params.location : params.location}

              items={suggestions}
              placeholder="Type to search location..."
              onInputChange={(value) => fetchSuggestions(value)}
              onSelectionChange={(key) => getareaandcity(key)}
              onReset={() => { setselectedArea(""); setSelectedLocation(""); }}
            >
              {(suggestions: any) => (
                <AutocompleteItem key={suggestions.value} className="capitalize">
                  {suggestions.label}
                </AutocompleteItem>
              )}
            </Autocomplete>


            <button onClick={() => handleSearch(defalut)}>Search</button>
          </div>
          <div className="Fillter-wrapper">
            <div className="Fillter-left">
              {/* <div className="heading border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Day
                </h3>
                <ul>
                  <li className="w-full ">
                    <div className="flex items-center ps-3">
                      <input
                        id="type"
                        checked={Selectedjob === ""}
                        onChange={() => handlejobtypeChange("")}
                        type="checkbox"
                        value=""
                        className="w-4 h-4 "
                      />
                      <label htmlFor="Part-Time" className="w-full py-3 ms-2">
                        All
                      </label>
                    </div>
                  </li>
                  <li className="w-full ">
                    <div className="flex items-center ps-3">
                      <input
                        id="type"
                        name="job_type[]"
                        checked={Selectedjob === "parttime"}
                        onChange={() => handlejobtypeChange("parttime")}
                        type="checkbox"
                        value="parttime"
                        className="w-4 h-4 "
                      />
                      <label htmlFor="Part-Time" className="w-full py-3 ms-2">
                        Part Time
                      </label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input
                        id="type1"
                        name="job_type[]"
                        checked={Selectedjob === "fulltime"}
                        onChange={() => handlejobtypeChange("fulltime")}
                        type="checkbox"
                        value="fulltime"
                        className="w-4 h-4 "
                      />
                      <label htmlFor="Full-Time" className="w-full py-3 ms-2 ">
                        Full Time
                      </label>
                    </div>
                  </li>
                </ul>
              </div> */}

              <div className="heading border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">Job Type</h3>
                <ul>

                  {jobTypes.map((jobType, index) => (
                    <li key={index} className="w-full">
                      <div className="flex items-center ps-3">
                        <input
                          id={`jobType-${index}`}
                          type="checkbox"
                          value={jobType.value}
                          checked={jobType.value === "" ? selectedJobs.length === jobTypes.length : selectedJobs.includes(jobType.value)}
                          onChange={() => handleJobTypeChange(jobType.value)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`jobType-${index}`} className="w-full py-3 ms-2">
                          {jobType.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="heading border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">Days of Week</h3>
                <ul>
                  {daysOfWeek.map((day, index) => (
                    <li key={index} className="w-full">
                      <div className="flex items-center ps-3">
                        <input
                          id={`day-${index}`}
                          type="checkbox"
                          value={day.value}
                          checked={day.value === "" ? selectedDays.length === daysOfWeek.length : selectedDays.includes(day.value)}
                          onChange={() => handleDayChange(day.value)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`day-${index}`} className="w-full py-3 ms-2">
                          {day.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>


              <div className="heading border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">Time Periods</h3>
                <ul>
                  {timePeriods.map((timePeriod, index) => (
                    <li key={index} className="w-full">
                      <div className="flex items-center ps-3">
                        <input
                          id={`timePeriod-${index}`}
                          type="checkbox"
                          value={timePeriod.value}
                          checked={timePeriod.value === "" ? selectedTimePeriods.length === timePeriods.length : selectedTimePeriods.includes(timePeriod.value)}
                          onChange={() => handleTimePeriodChange(timePeriod.value)}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`timePeriod-${index}`} className="w-full py-3 ms-2">
                          {timePeriod.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div className="heading border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Salary Range
                </h3>
                <ul>{renderSalaryRangeCheckboxes()}</ul>
              </div> */}
            </div>
            <div className="Fillter-right">
              {/* <div ><h1>Top</h1></div> */}
              <div className="body">{children}</div>
              {/* <div ><h1>bottom</h1></div> */}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

