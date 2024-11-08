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
            {/* <section className='mb-10'>
                <EducationalBlogSection />
            </section> */}
            <section id='test' className='mb-10'>
                <FinanceBusinessLibrary />
            </section>


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
        </div>
    </>
}

export default Home