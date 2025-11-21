import React, { useContext, useEffect, useState } from "react";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Internal Imports (components, Assets and Styles)
import Style from "./Footer.module.css";
import { Button } from "../..";
import {
  arrowRight,
  facebookIcon,
  instagramIcon,
  mail,
  telegramIcon,
  tiktokIcon,
  xIcon,
  youtubeIcon,
} from "../../../assets";
import { ConfigContext } from "../../../Context";

// External libraries
import { useTranslation } from "react-i18next";
import { useWindowSize } from "@uidotdev/usehooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { ROUTES } from "../../../routes";

function Footer() {
  const { t } = useTranslation();
  const size = useWindowSize();
  const { breakpoints } = useContext(ConfigContext);

  const isBelowMdBreakpoint = size.width < breakpoints.md.minWidth;

  return (
    <footer className="bg-darkgray dark:bg-black text-white/90">
      <div className="px-4 py-2 ">
        <div className="grid grid-cols-1  sm:grid-cols-2  py-10 gap-10 ">
          <div className="flex flex-col justify-between px-3 ">
            <div className="w-full flex-x-between px-2">
              <div className="">
                <h3 className="text-base font-bold mb-3">{t("logo")}</h3>
                <ul className="text-sm">
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to={ROUTES.ABOUTUS}
                    >
                      {t("navbar.aboutUs")}
                    </NavLink>
                  </li>
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to={ROUTES.ACTIVITIES}
                    >
                      {t("footer.activities")}
                    </NavLink>
                  </li>
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to={ROUTES.PARTNER_APPLICATION}
                    >
                      {t("footer.askAsPartner")}
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="">
                <h3 className="text-base font-bold mb-3">
                  {t("footer.ourServices")}
                </h3>
                <ul className="text-sm">
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to="training-and-education"
                    >
                      {t("navbar.trainingAndEducation")}
                    </NavLink>
                  </li>
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to="recorded-courses"
                    >
                      {t("navbar.recordedCourses")}
                    </NavLink>
                  </li>
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to={ROUTES.CHATAI}
                    >
                      {t("navbar.chatAI")}
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="">
                <h3 className="text-base font-bold mb-3">
                  {t("footer.contactUs.title")}
                </h3>
                <ul className="text-sm">
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to="recorded-courses"
                    >
                      {t("footer.contactUs.phone-1")}
                    </NavLink>
                  </li>
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to="opportunities-and-recommendations"
                    >
                      {t("footer.contactUs.email")}
                    </NavLink>
                  </li>
                  <li className="pt-2 mb-3">
                    <NavLink
                      className="hover:text-primary-300"
                      to="training-and-education"
                    >
                      {t("footer.contactUs.address-1")}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex-center  w-full p-1 ">
              <span>{t("footer.followUs")}</span>
              <hr className="bg-gray-600 h-0.5 w-full mb-4 mt-3" />
              <div className="flex  w-full justify-around ">
                {[
                  { icon: facebookIcon, alt: "footer.socialLinks.facebook" },
                  { icon: instagramIcon, alt: "footer.socialLinks.instagram" },
                  { icon: telegramIcon, alt: "footer.socialLinks.telegram" },
                  { icon: tiktokIcon, alt: "footer.socialLinks.tiktok" },
                  { icon: xIcon, alt: "footer.socialLinks.x" },
                  { icon: youtubeIcon, alt: "footer.socialLinks.youtube" },
                ].map((social, index) => (
                  <Link key={index}>
                    <img
                      src={social.icon}
                      alt={t(social.alt)}
                      className="img-icon"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="">
            <div className="">
              <div className=" mb-5 p-2 flex justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9051.862230160345!2d31.348574207638173!3d30.068020383718068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f50339ed26f%3A0x62296d6fcc1dc44!2z2LPZitiq2Yog2LPZhtiq2LE!5e0!3m2!1sar!2seg!4v1729089034108!5m2!1sar!2seg"
                  width="85%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center text-center">
              <p className="mb-3 ">{t("footer.subscribe.title")}</p>

              <form className="w-[85%] h-[10vh]">
                <div className=" flex gap-3 justify-center items-center " >
                  <div className="flex w-[60%] items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} size="lg" color="gray" className="" />
                    <input placeholder="name@example.com" className="px-3 py-1 w-full"></input>
                  </div>

                  <Button
                    btnText={!isBelowMdBreakpoint && t("footer.subscribe.btn")}
                    textColor="black"
                    bgColor="accent"
                    px={isBelowMdBreakpoint ? "px-2" : "px-5"}

                    btnClassName=" h-[5vh] "
                  >
                    {isBelowMdBreakpoint && (
                      <FontAwesomeIcon
                        className="ms-2 font-bolder"
                        icon={arrowRight}
                        flip="horizontal"
                      />
                    )}
                  </Button>
                </div>
              </form>



            </div>

          </div>

        </div>

        <div className="flex items-center mb-5 flex-col">

          <hr className="w-full h-[1px] bg-gray-600 mt-3 mb-3" />
          <div className="flex flex-col sm:flex-row items-center justify-center mt-3 ">
            <small className="tracking-wider text-gray-400 ">جميع الحقوق محفوظه لموقع و منصه ستوك سكويرز  2018 - 2025 </small>
            <div className="ms-5 flex gap-1 justify-center">
              <Link to={ROUTES.CONDITIONS} className="text-blue-500 underline">
                اتفاقية الشروط وسياسة الخصوصية
              </Link>{" "}
              و{" "}
              <Link className="text-blue-500 underline" to={ROUTES.PRIVACYPOLICY}>
                تحذير المخاطر
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
