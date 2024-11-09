import React, { useContext, useEffect, useState } from 'react';

// Internal Imports (components, Assets and Styles)
import Style from './Footer.module.css';
import { Button } from '../..';
import { arrowRight, facebookIcon, instagramIcon, mail, telegramIcon, tiktokIcon, xIcon, youtubeIcon } from '../../../assets';
import { ConfigContext } from '../../../Context';


// External libraries
import { useTranslation } from 'react-i18next';
import { useWindowSize } from '@uidotdev/usehooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import { TextInput } from 'flowbite-react';

function Footer() {
    const { t } = useTranslation();
    const size = useWindowSize();
    const { breakpoints } = useContext(ConfigContext);

    const isBelowMdBreakpoint = size.width < breakpoints.md.minWidth;

    useEffect(() => {
        
    }, []);

    return <>
        <footer className='bg-darkgray text-white/90'>
            {/* <div className='px-4 md:px-10 lg:px-16'> */}
            <div className='px-4'>
                <div className="flex-x-center py-10">
                    <div className='w-full md:w-1/3 flex-x-between px-4'>
                        <div className='lg:w-2/5 md:text-start pe-2 md:mb-6 lg:mb-0'>
                            <h3 className='text-base font-bold mb-1'>{t('logo')}</h3>
                            <ul className='text-sm'>
                                <li className='pt-2'>
                                    <NavLink className='hover:text-primary-300' to='training-and-education'>{t('navbar.aboutUs')}</NavLink>
                                </li>
                                <li className='pt-2'>
                                    <NavLink className='hover:text-primary-300' to='recorded-courses'>{t('navbar.ourTeam')}</NavLink>
                                </li>
                                <li className='pt-2'>
                                    <NavLink className='hover:text-primary-300' to='opportunities-and-recommendations'>{t('navbar.successPartners')}</NavLink>
                                </li>
                                <li className='pt-2'>
                                    <NavLink className='hover:text-primary-300' to='finance-and-business-library'>{t('navbar.careers')}</NavLink>
                                </li>
                            </ul>
                        </div>
                        {/* <div className='w-1/2 text-center mb-6 md:w-1/4 md:text-start md:mb-0'>
                            <h3 className='text-base font-bold mb-1'>{t('footer.siteMap')}</h3>
                            <ul className='text-sm'>
                                <li className='pt-2'>
                                    <NavLink to='training-and-education'>{t('navbar.trainingAndEducation')}</NavLink>
                                </li>
                                <li className='pt-2'>
                                    <NavLink to='recorded-courses'>{t('navbar.recordedCourses')}</NavLink>
                                </li>
                                <li className='pt-2'>
                                    <NavLink to='finance-and-business-library'>{t('navbar.financeAndBusinessLibrary')}</NavLink>
                                </li>
                                <li className='pt-2'>
                                    <NavLink to='finance-and-business-library'>{t('navbar.educationalBlog')}</NavLink>
                                </li>
                            </ul>
                        </div> */}
                        <div className='lg:w-3/5 md:text-start'>
                            <h3 className='text-base font-bold mb-1'>{t('footer.ourServices')}</h3>
                            <ul className='text-sm'>
                                {/* <div> */}
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='partner-application'>{t('navbar.tryTradingForFree')}</NavLink>
                                    </li>
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='opportunities-and-recommendations'>{t('navbar.chatAI')}</NavLink>
                                    </li>
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='training-and-education'>{t('navbar.trainingAndEducation')}</NavLink>
                                    </li>
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='recorded-courses'>{t('navbar.recordedCourses')}</NavLink>
                                    </li>
                                {/* </div>
                                <div> */}
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='finance-and-business-library'>{t('navbar.financeAndBusinessLibrary')}</NavLink>
                                    </li>
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='finance-and-business-library'>{t('navbar.educationalBlog')}</NavLink>
                                    </li>
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='partner-application'>{t('navbar.partnerApplication')}</NavLink>
                                    </li>
                                {/* </div> */}
                                <li className='pt-2'>
                                    <NavLink className='hover:text-primary-300' to='finance-and-business-library'>{t('navbar.investorPersonalitySurvey')}</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-full md:w-2/3 px-4 flex-col-between'>
                        <div className=' mb-6 md:text-start flex-x-between grow'>
                            <div className='my-6 md:my-0'>
                                <h3 className='text-base font-bold mb-1'>{t('footer.contactUs.title')}</h3>
                                <ul className='text-sm'>
                                    <li className='pt-2'> {/* phone number should be from left to right in both en and ar, and justified to start in both */}
                                        <NavLink className='hover:text-primary-300' to='recorded-courses'>{t('footer.contactUs.phone-1')}</NavLink>
                                    </li>
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='opportunities-and-recommendations'>{t('footer.contactUs.email')}</NavLink>
                                    </li>
                                    <li className='pt-2'>
                                        <NavLink className='hover:text-primary-300' to='training-and-education'>{t('footer.contactUs.address-1')}</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className='w-2/3 min-w-72 min-h-48 mx-auto'>
<<<<<<< HEAD
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9051.862230160345!2d31.348574207638173!3d30.068020383718068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f50339ed26f%3A0x62296d6fcc1dc44!2z2LPZitiq2Yog2LPZhtiq2LE!5e0!3m2!1sar!2seg!4v1729089034108!5m2!1sar!2seg" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
=======
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9051.862230160345!2d31.348574207638173!3d30.068020383718068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f50339ed26f%3A0x62296d6fcc1dc44!2z2LPZitiq2Yog2LPZhtiq2LE!5e0!3m2!1sar!2seg!4v1729089034108!5m2!1sar!2seg" width="100%" height="100%" loading="lazy"></iframe>
>>>>>>> 4b237b7 (Your commit message)
                            </div>
                        </div>
                        <div>
                            <p className='mb-3'>{t('footer.subscribe.title')}</p>
                            <form>
                                {/* <div className="flex">
                                    <label htmlFor="email-ads-subscription" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                                    <div className="w-full">
                                        <input type="email" id="email-ads-subscription" name='email-ads-subscription' className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white/30 rounded-s-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-white/60" placeholder="البريد الإلكتروني" />
                                    </div>
                                    <button className=" text-black flex-shrink-0 z-10 inline-flex items-center py-2.5 px-8 text-sm font-medium text-center text-black bg-accent border border-s-0 border-accent hover:bg-red-600 hover:border-red-600 hover:text-white/90 dark:border-gray-700 dark:text-white rounded-e-lg focus:bg-red-500 focus:border-red-500 focus:text-white/90 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 transDuration-300" type="button">{t('footer.subscribe.btn')}</button>
                                </div> */}
                                <div className="flex-x-center">
                                    <TextInput id="emailToSubscibe" type="email" icon={mail} className='input-parent grow me-4' placeholder="name@example.com" />
                                    <Button btnText={!isBelowMdBreakpoint && t('footer.subscribe.btn')} textColor='black' bgColor='accent' px={isBelowMdBreakpoint ? 'px-4' : 'px-8'}>
                                        {isBelowMdBreakpoint && <FontAwesomeIcon className='ms-2 font-bolder' icon={arrowRight} flip="horizontal" />}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='flex-center gap-6 border-t border-gray-600'>
                    <span>{t('footer.followUs')}</span>
                    <div className='flex-center gap-3 my-6'>
                        <Link><img src={facebookIcon} alt={t('footer.socialLinks.facebook')} className='img-icon'/></Link>
                        <Link><img src={instagramIcon} alt={t('footer.socialLinks.instagram')} className='img-icon'/></Link>
                        <Link><img src={telegramIcon} alt={t('footer.socialLinks.telegram')} className='img-icon'/></Link>
                        <Link><img src={tiktokIcon} alt={t('footer.socialLinks.tiktok')} className='img-icon'/></Link>
                        <Link><img src={xIcon} alt={t('footer.socialLinks.x')} className='img-icon'/></Link>
                        <Link><img src={youtubeIcon} alt={t('footer.socialLinks.youtube')} className='img-icon'/></Link>
                    </div>
                </div>
            </div>
        </footer>
    </>
}

export default Footer