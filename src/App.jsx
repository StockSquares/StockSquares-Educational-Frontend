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
  Admin,
  Employee,
  Article,
  Blog,
  Course,
  Reservation,
  Payment,
} from './pages';
import { ROUTES } from './routes';
import Footer from './components/general-layout-context/Footer/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import ConfigProvider from './Context/ConfigContext';
import UserContextProvider from './Context/UserContext';
import AisleContextProvider from './Context/AisleContext';
import { ThemeProvider } from './Context/ThemeContext';
import { Helmet } from 'react-helmet';
import 'flowbite';
import './App.css';

// Create router instance
const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.BOOKSTORE, element: <FinanceAndBusinessLibrary /> },
      { path: ROUTES.BLOG, element: <Blog /> },
      { path: ROUTES.ARTICLE, element: <Article /> },
      {
        path: ROUTES.TRAINING_AND_EDUCATION,
        element: <TrainingAndEducation />,
      },
      { path: ROUTES.RECORDED_COURSES, element: <RecordedCourses /> },
      { path: ROUTES.COURSE, element: <Course /> },
      { path: ROUTES.RESERVATION, element: <Reservation /> },
      { path: ROUTES.PAYMENT, element: <Payment />},
      {
        path: ROUTES.OPPORTUNITIES_AND_RECOMMENDATIONS,
        element: (
          <ProtectedRoute element={<OpportunitiesAndRecommendations />} />
        ),
      },
      {
        path: ROUTES.PARTNER_APPLICATION,
        element:<PartnerApplication /> ,
      },
      {
        path: ROUTES.TRY_TRADING_FOR_FREE,
         element:<TryTradingForFree />,
      },
      {
        path: ROUTES.VIP_INVESTOR_SERVICES,
        element: <ProtectedRoute element={<VIPInvestorServices />} />,
      },
      {
        path: ROUTES.USER,
        element: <ProtectedRoute element={<User />} />,
      },
      {
        path: ROUTES.ADMIN,
        element: <ProtectedRoute element={<Admin />} />,
      },
      {
        path: ROUTES.EMPLOYEE,
        element: <ProtectedRoute element={<Employee />} />,
      },
      { path: ROUTES.NOT_FOUND, element: <NotFound /> },
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