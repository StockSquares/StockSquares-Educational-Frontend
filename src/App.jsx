import {
  Layout,
  Home,
  Login,
  Register,
  NotFound,
  TrainingAndEducation,
  RecordedCourses,
  OpportunitiesAndRecommendations,
  FinanceAndBusinessLibrary,
  PartnerApplication,
  TryTradingForFree,
  VIPInvestorServices,
  User,
  Client,
  Employee,
  Article,
  BookYourTrainer,
  Blog,
  Course,
  Reservation,
  Payment,
  InvestorSurvey,
  RequestConsultation,
  InlineBlog,
  CourseContent,
} from "./pages";
import  JoinAsTrainer from "./pages/JoinAsTrainer/Joinastrainer";
import { ROUTES } from "./routes";
import BookDetails from "./pages/FinanceAndBusinessLibrary/multipages/bookdetails"
import Footer from "./components/general-layout-context/Footer/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import ConfigProvider from "./Context/ConfigContext";
import UserContextProvider from "./Context/UserContext";
import AisleContextProvider from "./Context/AisleContext";
import { ThemeProvider } from "./Context/ThemeContext";
import { Helmet } from "react-helmet";
import "flowbite";
import "./App.css";
import { element } from "prop-types";
import Admin1 from "./pages/Admin/Admin1";
import Employees from "./pages/Admin/Employees";
import Trainer from "./pages/trainerPortal/Trainer";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy";
import WhoWeAre from "./pages/WhoWeAre/WhoWeAre";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Activities from "./pages/Activities/Activities";
import ChatAi from "./pages/chatAi/ChatAi";
import LevelExam from "./pages/levelexam/LevelExam";
import LevelExamQuestions from "./pages/levelexam/LevelExamQuestions";
// import RequestConsultation from './pages/RequestConsultation/RequestConsultation';
// import inlineBlog from './pages/Blog/inlineBlog';

// Create router instance
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.INVESTORSURVEY, element: <InvestorSurvey /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.BOOKSTORE, element: <FinanceAndBusinessLibrary /> },
      { path: ROUTES.BOOK_YOUR_TRAINER, element: <BookYourTrainer /> },
      { path: ROUTES.BLOG, element: <Blog /> },
      { path: ROUTES.ARTICLE, element: <Article /> },
      // { path: ROUTES.BOOK_DETAILS, element: <BookDetails /> },
      {
        path: "/bookdetails/:id",
        element: <BookDetails />,
      },
      {
        path: ROUTES.TRAINING_AND_EDUCATION,
        element: <TrainingAndEducation />,
      },
      { path: ROUTES.RECORDED_COURSES, element: <RecordedCourses /> },
      { path: ROUTES.COURSE, element: <Course /> },
      { path: ROUTES.RESERVATION, element: <Reservation /> },
      { path: ROUTES.PAYMENT, element: <Payment /> },
      {
        path: ROUTES.OPPORTUNITIES_AND_RECOMMENDATIONS,
        element: (
          <ProtectedRoute element={<OpportunitiesAndRecommendations />} />
        ),
      },
      {
        path: ROUTES.PARTNER_APPLICATION,
        element: <PartnerApplication />,
      },
      {
        path: ROUTES.TRY_TRADING_FOR_FREE,
        element: <TryTradingForFree />,
      },
      {
        path: ROUTES.VIP_INVESTOR_SERVICES,
        element: <ProtectedRoute element={<VIPInvestorServices />} />,
      },
      {
        path: ROUTES.USER,
        element: <ProtectedRoute element={<User />} />,
      },
      // {
      //   path: ROUTES.ADMIN,
      //   element: <ProtectedRoute element={<Admin />} />,
      // },
      {
        path:ROUTES.ADMIN1,
        element:<Admin1/>
      },
      {
        path: "/Employees/*",
        element: <Employees/>
      },
      {
        path: ROUTES.EMPLOYEE,
        element: <ProtectedRoute element={<Employee />} />,
      },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
      { path: ROUTES.REQUESTCONSULTATION, element: <RequestConsultation /> },
      { path: ROUTES.INLINEBlog, element: <InlineBlog /> },
      {path: ROUTES.COURSECONTENT, element: <CourseContent/>},
      {path: ROUTES.BOOKDETAILS, element: <BookDetails/>},
        {
        path: "/Trainer/*",
        element: <Trainer/>
      },
      {path: ROUTES.PRIVACYPOLICY,
        element:<PrivacyPolicy/>
      },
      {path: ROUTES.ABOUTUS,
        element:<WhoWeAre/>
      },

      {path: ROUTES.CONDITIONS,
        element:<TermsAndConditions/>
      },
      {path: ROUTES.ACTIVITIES,
        element:<Activities/>
      },
      {path: ROUTES.CHATAI,
        element:<ChatAi/>
      },
      {
        path:ROUTES.LEVELEXAM,
        element:<LevelExam/>
      },
      {
        path:ROUTES.LEVELEXAMQUESTIONS,
        element:<LevelExamQuestions/>
      }
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider>
        <UserContextProvider>
          <AisleContextProvider>
            <RouterProvider router={router} />
          </AisleContextProvider>
        </UserContextProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
