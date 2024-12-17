import React from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Home.module.css';
import {
   
    AboutSection,
    FinanceBusinessLibrary,
    TestimonialsSection,
    VIPInvestorServicesSection,
    PracticalTrainingSection,
    Ad
} from '../../components';

function Home() {
    return (
        <div className='container mx-auto px-4'>
            {/* Advertisement Section */}
            <section className='mb-10 mt-4'>
                <Ad />
            </section>

            {/* Recorded Courses Section */}
          

            {/* Practical Training Section */}
            <section className='mb-10'>
                <PracticalTrainingSection />
            </section>

            {/* VIP Investor Services Section */}
            <section className='mb-10'>
                <VIPInvestorServicesSection />
            </section>

            {/* Finance Business Library Section */}
            <section id='finance-library' className='mb-10'>
                <FinanceBusinessLibrary />
            </section>

            {/* Testimonials and About Sections */}
            <div className='flex flex-col lg:flex-row justify-between mb-10'>
                <section className='w-full lg:w-1/2 lg:pe-3 mb-10 lg:mb-0'>
                    <TestimonialsSection />
                </section>
                <section className='w-full lg:w-1/2 lg:ps-3'>
                    <AboutSection />
                </section>
            </div>

            {/* Optional: Uncomment if you want to include Educational Blog Section */}
            {/* <section className='mb-10'>
                <EducationalBlogSection />
            </section> */}
        </div>
    );
}

export default Home;