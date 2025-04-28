import React from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./Home.module.css";
import {
  AboutSection,
  FinanceBusinessLibrary,
  TestimonialsSection,
  VIPInvestorServicesSection,
  PracticalTrainingSection,
  Ad,
  RecordedCourseCard,
} from "../../components";

function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Advertisement Section */}
      <section className="mb-2 mt-4">
        <Ad />
      </section>

      <section className="grid grid-cols-1 gap-2 lg:grid-cols-2 mb-5 md:grid-cols-2"></section>

      <section className="grid grid-cols-1 overflow-hidden mb-10  gap-3 md:grid-cols-2 ">
    
        {/* Practical Training Section */}
        <section className=" ">
          <PracticalTrainingSection />
        </section>
          {/* Recorded Courses Section */}
          <section className="">
          <RecordedCourseCard />
        </section>
      </section>

 

      {/* Finance Business Library Section */}
      <section id="finance-library" className="mb-10">
        <FinanceBusinessLibrary />
      </section>

           {/* VIP Investor Services Section */}
           <section className="grid grid-cols-1 gap-2 lg:grid-cols-2 mb-10 md:grid-cols-2">
        <VIPInvestorServicesSection />
        <TestimonialsSection />
      </section>

      {/* Testimonials and About Sections */}
      <section className="w-full mb-10">
        <AboutSection />
      </section>

      {/* Optional: Uncomment if you want to include Educational Blog Section */}
      {/* <section className='mb-10'>
                <EducationalBlogSection />
            </section> */}
    </div>
  );
}

export default Home;
