import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Home.module.css';
import {
    EducationalBlogSection,
    AboutSection,
    FinanceBusinessLibrary,
    TestimonialsSection,
    VIPInvestorServicesSection,
    PracticalTrainingSection,
    RecordedCoursesSection,
    Ad
} from '../../components';

// External libraries

function Home() {
    const [counter, setCounter] = useState(0);


    useEffect(() => {
<<<<<<< HEAD

=======
        
>>>>>>> 4b237b7 (Your commit message)
    }, []);

    return <>
        <div className='container'>
            <section className='mb-10 mt-4'>
                <Ad />
            </section>
            <section className='mb-10'>
                <RecordedCoursesSection />
            </section>
            <section className='mb-10'>
                <PracticalTrainingSection />
            </section>
<<<<<<< HEAD
=======
            <section className='mb-10'>
                <VIPInvestorServicesSection />
            </section>
>>>>>>> 4b237b7 (Your commit message)
            {/* <section className='mb-10'>
                <EducationalBlogSection />
            </section> */}
            <section id='test' className='mb-10'>
                <FinanceBusinessLibrary />
            </section>
<<<<<<< HEAD


            <div className=' row justify-between  mb-10'>
                <section className=' lg:w-1/2 p-3 '>
                    <VIPInvestorServicesSection />
                </section>
                <section className=' lg:w-1/2 p-3'>
                    <TestimonialsSection />
                </section>
            </div>
           

            <section className='mb-10'>
                <AboutSection />
            </section>
=======
            <div className='flex-stretch-parent justify-between mb-10'>
                <section className='w-full lg:w-1/2 lg:pe-3 mb-10 lg:mb-0'>
                    <TestimonialsSection />
                </section>
                <section className='w-full lg:w-1/2 lg:ps-3'>
                    <AboutSection />
                </section>
            </div>
>>>>>>> 4b237b7 (Your commit message)
        </div>
    </>
}

export default Home