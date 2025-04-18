import React, { useContext, useEffect } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./RecordedCourses.module.css";
import { search } from "../../assets";
import {
  AisleArticleLink,
  BlogArticleCard,
  Button,
  FlexibleCard,
  Sidebar,
  RecordedCoursesSection,
} from "../../components";
import { AisleContext } from "../../Context";
import { ROUTES } from "../../routes";

// External libraries
import { Tabs, TextInput } from "flowbite-react";

function RecordedCourses() {
  const { handleAisle } = useContext(AisleContext);

  useEffect(() => {
    // You can add any initialization logic here if needed
  }, []);

  return (
    <div className="">
      {/* <div className="bg-lightgray h-[30vh] flex-center">
        {/* <form className="w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <TextInput
              id="emailToSubscibe"
              type="email"
              icon={search}
              className="input-parent grow mb-2 md:mb-0 me-0 md:me-4"
              placeholder="Search"
            />
            <Button btnText="Search" bgColor="primary" px="px-8" />
          </div>
        </form> 
      </div> */}
 
      <section className='mb-10'>
         <RecordedCoursesSection />
     </section>
     
     </div>
    
  );
}

export default RecordedCourses;
