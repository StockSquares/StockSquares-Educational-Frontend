import React from "react";
import { Suspense, lazy } from "react";
import { ROUTES } from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import ConfigProvider from "./Context/ConfigContext";
import UserContextProvider from "./Context/UserContext";
import AisleContextProvider from "./Context/AisleContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { Helmet } from "react-helmet";
import "flowbite";
import "./App.css";
import { AuthProvider } from "./Context/AuthContext";
import { CategoriesProvider } from "./Context/CategoriesContext";
// import { CountriesProvider } from "./Context/CountriesContext";
import { Loader } from "./components";
// import { Layout } from "./pages";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import TrainingAndEducation from "./pages/TrainingAndEducation/TrainingAndEducation";
import SideBar from "./components/general/SideBar/SideBar";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JobStatusProvider } from "./Context/JobStatusContext";

import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
//  const TrainingAndEducation = lazy(() => );
const RecordedCourses = lazy(() =>
  import("./pages/RecordedCourses/RecordedCourses")
);
const OpportunitiesAndRecommendations = lazy(() =>
  import(
    "./pages/OpportunitiesAndRecommendations/OpportunitiesAndRecommendations"
  )
);
const FinanceAndBusinessLibrary = lazy(() =>
  import("./pages/FinanceAndBusinessLibrary/FinanceAndBusinessLibrary.jsx")
);
const PartnerApplication = lazy(() =>
  import("./pages/PartnerApplication/PartnerApplication")
);
const TryTradingForFree = lazy(() =>
  import("./pages/TryTradingForFree/TryTradingForFree")
);
const VIPInvestorServices = lazy(() =>
  import("./pages/VIPInvestorServices/VIPInvestorServices")
);
const User = lazy(() => import("./pages/User/User"));
// const Employee = lazy(() => import("./pages/Employee/Employee"));
// const Article = lazy(() => import("./pages/Article/Article"));
const BookYourTrainer = lazy(() =>
  import("./pages/BookYourTrainer/BookYourTrainer")
);
const Blog = lazy(() => import("./pages/Blog/Blog"));
const Course = lazy(() => import("./pages/Course/Course"));
const Reservation = lazy(() => import("./pages/Reservation/Reservation"));
//  const Payment = lazy(() => import("./pages/Payment/Payment"));
const InvestorSurvey = lazy(() =>
  import("./pages/InvestorSurvey/InvestorSurvey.jsx")
);
const RequestConsultation = lazy(() =>
  import("./pages/RequestConsultation/RequestConsultation")
);
//  const InlineBlog = lazy(() => import("./pages/InlineBlog/InlineBlog"));
const CourseContent = lazy(() => import("./pages/CourseContent/CourseContent"));
const JoinAsTrainer = lazy(() => import("./pages/JoinAsTrainer/Joincomp"));
const BookDetails = lazy(() =>
  import("./pages/FinanceAndBusinessLibrary/multipages/BookDetails")
);
const Admin1 = lazy(() => import("./pages/Admin/Admin1"));
const Employees = lazy(() => import("./pages/employeesPortal/Employees"));
const Client = lazy(() => import("./pages/Admin/Client"));
const Trainer = lazy(() => import("./pages/trainerPortal/Trainer"));
const PrivacyPolicy = lazy(() => import("./pages/privacyPolicy/PrivacyPolicy"));
const WhoWeAre = lazy(() => import("./pages/WhoWeAre/WhoWeAre"));
const TermsAndConditions = lazy(() =>
  import("./pages/TermsAndConditions/TermsAndConditions")
);
const Activities = lazy(() => import("./pages/Activities/Activities"));
const ChatAi = lazy(() => import("./pages/chatAi/ChatAi"));
const LevelExam = lazy(() => import("./pages/levelexam/LevelExam"));
const LevelExamQuestions = lazy(() =>
  import("./pages/levelexam/LevelExamQuestions")
);
const Date = lazy(() => import("./pages/Reservation/Date"));
const SendCode = lazy(() => import("./pages/ResetPassword/SendCode"));
const ConfirmCode = lazy(() => import("./pages/ResetPassword/ConfirmCode"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));
const VerifyOTP = lazy(() => import("./pages/Register/VerifyOTP"));
const Partner = lazy(() => import("./pages/PartnerPortal/Partner"));

// const pages = {};
// for (const [key, Path] of Object.entries(lazyPages)) {
//   pages[key] = lazy(() => import(`${Path}`));
// }import { jobStatusProvider } from './Context/JobStatusContext';

// Create router instance
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: ROUTES.INVESTORSURVEY,
        element: (
          <Suspense fallback={<Loader />}>
            <InvestorSurvey />
          </Suspense>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BOOKSTORE,
        element: (
          <Suspense fallback={<Loader />}>
            <FinanceAndBusinessLibrary />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BOOK_YOUR_TRAINER,
        element: (
          <Suspense fallback={<Loader />}>
            <BookYourTrainer />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BLOG,
        element: (
          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>
        ),
      },
      // {
      //   path: ROUTES.ARTICLE,
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <Article />
      //     </Suspense>
      //   ),
      // },
      {
        path: ROUTES.JOIN_AS_TRAINER,
        element: (
          <Suspense fallback={<Loader />}>
            <JoinAsTrainer />
          </Suspense>
        ),
      },
      {
        path: "/bookdetails/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <BookDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TRAINING_AND_EDUCATION,
        element: <TrainingAndEducation />,
      },
      {
        path: ROUTES.RECORDED_COURSES,
        element: (
          <Suspense fallback={<Loader />}>
            <RecordedCourses />
          </Suspense>
        ),
      },
      {
        path: ROUTES.COURSE,
        element: (
          <Suspense fallback={<Loader />}>
            <Course />
          </Suspense>
        ),
      },
      {
        path: ROUTES.RESERVATION,
        element: (
          <Suspense fallback={<Loader />}>
            <Reservation />
          </Suspense>
        ),
      },
      // { path: ROUTES.PAYMENT, element: <Suspense fallback={<Loader />}><Payment /></Suspense> },
      {
        path: ROUTES.OPPORTUNITIES_AND_RECOMMENDATIONS,
        element: (
          <Suspense fallback={<Loader />}>
            <OpportunitiesAndRecommendations />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PARTNER_APPLICATION,
        element: (
          <Suspense fallback={<Loader />}>
            <PartnerApplication />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TRY_TRADING_FOR_FREE,
        element: (
          <Suspense fallback={<Loader />}>
            <TryTradingForFree />
          </Suspense>
        ),
      },
      {
        path: ROUTES.VIP_INVESTOR_SERVICES,
        element: (
          <Suspense fallback={<Loader />}>
            <VIPInvestorServices />
          </Suspense>
        ),
      },
      {
        path: ROUTES.USER,
        element: <Suspense fallback={<Loader />}><User /> </Suspense>,
      },
      {
        path: ROUTES.ADMIN1,
        element: (
          <Suspense fallback={<Loader />}>
            <Admin1 />
          </Suspense>
        ),
      },
      {
        path: "/Employees/*",
        element: (
          <Suspense fallback={<Loader />}>
            <Employees />
          </Suspense>
        ),
      },

      {
        path: ROUTES.CLIENT,
        element: (
          <Suspense fallback={<Loader />}>
            <Client />
          </Suspense>
        ),
      },
      {
        path: ROUTES.NOT_FOUND,
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: ROUTES.REQUESTCONSULTATION,
        element: (
          <Suspense fallback={<Loader />}>
            <RequestConsultation />
          </Suspense>
        ),
      },
      // { path: ROUTES.INLINEBlog, element: <Suspense fallback={<Loader />}><InlineBlog /></Suspense> },
      {
        path: ROUTES.COURSECONTENT,
        element: (
          <Suspense fallback={<Loader />}>
            <CourseContent />
          </Suspense>
        ),
      },
      {
        path: ROUTES.BOOKDETAILS,
        element: (
          <Suspense fallback={<Loader />}>
            <BookDetails />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TRAINER,
        element: (
          <Suspense fallback={<Loader />}>
            <Trainer />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PRIVACYPOLICY,
        element: (
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ABOUTUS,
        element: (
          <Suspense fallback={<Loader />}>
            <WhoWeAre />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CONDITIONS,
        element: (
          <Suspense fallback={<Loader />}>
            <TermsAndConditions />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ACTIVITIES,
        element: (
          <Suspense fallback={<Loader />}>
            <Activities />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CHATAI,
        element: (
          <Suspense fallback={<Loader />}>
            <ChatAi />
          </Suspense>
        ),
      },
      {
        path: ROUTES.LEVELEXAM,
        element: (
          <Suspense fallback={<Loader />}>
            <LevelExam />
          </Suspense>
        ),
      },
      {
        path: ROUTES.LEVELEXAMQUESTIONS,
        element: (
          <Suspense fallback={<Loader />}>
            <LevelExamQuestions />
          </Suspense>
        ),
      },
      {
        path: ROUTES.DATE,
        element: (
          <Suspense fallback={<Loader />}>
            <Date />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SENDCODE,
        element: (
          <Suspense fallback={<Loader />}>
            <SendCode />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CONFIRMCODE,
        element: (
          <Suspense fallback={<Loader />}>
            <ConfirmCode />
          </Suspense>
        ),
      },
      {
        path: ROUTES.RESETPASSWORD,
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: ROUTES.VERIFYOTP,
        element: (
          <Suspense fallback={<Loader />}>
            <VerifyOTP />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PARTNER,
        element: (
          <Suspense fallback={<Loader />}>
            <Partner />
          </Suspense>
        ),
      },
      { path: "/sidebar", element: <SideBar /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <UserContextProvider>
          <AisleContextProvider>
            <CategoriesProvider>
              <QueryClientProvider client={queryClient}>
                <AuthProvider>
                  <JobStatusProvider>
                    <GoogleOAuthProvider clientId="914414890801-3noui8aprqr7mnqfk7hd35q47cm72f4e.apps.googleusercontent.com">
                      <RouterProvider router={router} />
                    </GoogleOAuthProvider>
                  </JobStatusProvider>
                </AuthProvider>
              </QueryClientProvider>
            </CategoriesProvider>
          </AisleContextProvider>
        </UserContextProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
