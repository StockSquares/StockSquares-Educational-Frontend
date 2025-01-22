import React, { useContext, useEffect, useState } from "react";

// Internal Imports (components, Assets and Styles)
import Style from "./Article.module.css";
import { home, search } from "../../assets";
import { Button, SecondaryInfo, Sidebar } from "../../components";
import { ROUTES } from "../../routes";

import { useParams } from "react-router-dom";

// External libraries
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Breadcrumb, Dropdown, Tabs, TextInput } from "flowbite-react";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { ConfigContext } from "../../Context";


function Article() {
  const { title } = useParams();
  const { t } = useTranslation();
  const { scrollToPosition } = useContext(ConfigContext);

  // I don't know if I will use this or not
  const handleScroll = (e, targetId) => {
    e.preventDefault(); // Prevent default link behavior
    const targetElement = document.querySelector(targetId); // Use the dynamic ID to find the element
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop, // Scroll to the top of the target element
        behavior: "smooth", // Add smooth scrolling
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="bg-gray-50 pb-8">
        <div className="bg-primary-50 h-[50vh] flex-center p-4 mb-6">
          <div className="w-full md:w-2/3 lg:w-1/2">
            <div className="flex-center flex-col">
              <h2>{decodeURIComponent(title)}</h2>
              <p>
                {
                  blogCardDetails.find(
                    (desc) => desc.title === decodeURIComponent(title)
                  )?.description1
                }
              </p>
              <SecondaryInfo />
            </div>
            <div>or Ad</div>
          </div>
        </div>
        <div className="flex-center pb-4">
          {/* <!-- Breadcrumb --> */}
          <nav
            className="breadcrumb flex justify-between"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center mb-3 sm:mb-0">
              <li>
                <Link to={ROUTES.HOME}>{t("navbar.home")}</Link>
              </li>
              <span className="mx-2 text-gray-400">/</span>
              <li>
                <Dropdown label={t("navbar.educationalBlog")} inline>
                  <Dropdown.Item>Category-1</Dropdown.Item>
                  <Dropdown.Item>Category-2</Dropdown.Item>
                  <Dropdown.Item>Category-3</Dropdown.Item>
                  <Dropdown.Item>Category-4</Dropdown.Item>
                </Dropdown>
              </li>
              <span className="mx-2 text-gray-400">/</span>
              <li>
                <span>Article title with dots bec...</span>
              </li>
            </ol>
          </nav>
        </div>
        <div className="container">
          <div className="flex-x-between items-start">
            <div className="w-full md:w-9/12 lg:w-3/4 lg:pe-5 p-4 border">
              <div>
                {" "}
                {/* article content */}
                <div className="h-96" id="content">
                  Article content
                </div>
                <div className="h-96" id="justify">
                  Article justify
                </div>
                <div className="h-96" id="vert">
                  Article vert
                </div>
                <div className="h-96" id="cyan">
                  Article cyan
                </div>
                <div className="h-96" id="foot">
                  Article foot
                </div>
                <div className="h-96" id="bar">
                  Article bar
                </div>
              </div>
              <div className="flex-x-between border-t py-8">
                {" "}
                {/* article writer */}
                <div className="md:w-1/4 flex-center">
                  <div className="bg-primary-300 w-16 h-16 md:w-28 md:h-28 rounded-full outline outline-offset-4 outline-primary-300">
                    <img src="" alt="writer-picture" />
                  </div>
                </div>
                <div className="md:w-3/4 px-4 me-auto">
                  <h4>writer</h4>
                  <p>writer description</p>
                  <div>social contacts</div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/12 lg:w-1/4 px-4 sticky top-28">
              <div className="border-s-2 mb-8 shadow-sm py-4">
                <h4 className="font-semibold ps-4">Content</h4>
                <ul className="test">
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <NavLink
                      to="/educational-article/#content"
                      onClick={(e) => handleScroll(e, "#content")}
                    >
                      content
                    </NavLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <NavLink
                      to="/educational-article/#justify"
                      onClick={(e) => handleScroll(e, "#justify")}
                    >
                      justify
                    </NavLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <NavLink
                      to="/educational-article/#vert"
                      onClick={(e) => handleScroll(e, "#vert")}
                    >
                      vert
                    </NavLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <NavLink
                      to="/educational-article/#cyan"
                      onClick={(e) => handleScroll(e, "#cyan")}
                    >
                      cyan
                    </NavLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <NavLink
                      to="/educational-article/#foot"
                      onClick={(e) => handleScroll(e, "#foot")}
                    >
                      foot
                    </NavLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <NavLink
                      to="/educational-article/#bar"
                      onClick={(e) => handleScroll(e, "#bar")}
                    >
                      bar
                    </NavLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <HashLink to="/educational-article/#content" smooth>
                      content
                    </HashLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <HashLink to="/educational-article/#justify" smooth>
                      justify
                    </HashLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <HashLink to="/educational-article/#vert" smooth>
                      vert
                    </HashLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <HashLink to="/educational-article/#cyan" smooth>
                      cyan
                    </HashLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <HashLink to="/educational-article/#foot" smooth>
                      foot
                    </HashLink>
                  </li>
                  <li className="px-4 py-1 hover:bg-white hover:text-primary-800">
                    <HashLink to="/educational-article/#bar" smooth>
                      bar
                    </HashLink>
                  </li>
                </ul>
              </div>
              <Sidebar recentTitle="Also Read" />
            </div>
          </div>
          <div className="my-8 bg-primary-100 p-4">
            <div>
              <h4>Related Courses</h4>
            </div>
          </div>
          <div className="my-8 bg-primary-100 p-4">
            <h4>Comments</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
