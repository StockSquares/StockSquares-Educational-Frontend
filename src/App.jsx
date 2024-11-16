import { useContext, useState } from 'react'
import './App.css'
import {Layout,Home,Login,Register,NotFound,TrainingAndEducation,RecordedCourses,OpportunitiesAndRecommendations,FinanceAndBusinessLibrary,PartnerApplication,TryTradingForFree,VIPInvestorServices,User,Admin,Employee,Article,Blog,Course,Reservation} from './pages';
import { ROUTES } from './routes';
import Footer from './components/general-layout-context/Footer/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import ConfigProvider from './Context/ConfigContext';
import UserContextProvider from './Context/UserContext';
import { Helmet } from 'react-helmet';
import 'flowbite';
import AisleContextProvider from './Context/AisleContext';



// Create router instance
const router = createBrowserRouter([
    {
        path: '', element: <Layout />, children: [
            { index: true, element: <Home /> }, // Accessible without authentication
            { path: ROUTES.LOGIN, element: <Login /> }, // Accessible without authentication
            { path: ROUTES.REGISTER, element: <Register /> }, // Accessible without authentication
            { path: ROUTES.BOOKSTORE, element: <FinanceAndBusinessLibrary /> }, // Accessible without authentication
            { path: ROUTES.BLOG, element: <Blog /> }, // Accessible without authentication
            { path: ROUTES.ARTICLE, element: <Article /> }, // Accessible without authentication
            // { path: ROUTES.TRAINING_AND_EDUCATION, element: <ProtectedRoute element={<TrainingAndEducation />} /> },
            { path: ROUTES.TRAINING_AND_EDUCATION, element:<TrainingAndEducation /> },
            { path: ROUTES.RECORDED_COURSES, element: <RecordedCourses /> },
            { path: ROUTES.COURSE, element: <Course /> },
            { path: ROUTES.RESERVATION, element: <Reservation /> },
            { path: ROUTES.OPPORTUNITIES_AND_RECOMMENDATIONS, element: <ProtectedRoute element={<OpportunitiesAndRecommendations />} /> },
            { path: ROUTES.PARTNER_APPLICATION, element: <ProtectedRoute element={<PartnerApplication />} /> },
            { path: ROUTES.TRY_TRADING_FOR_FREE, element: <ProtectedRoute element={<TryTradingForFree />} /> },
            { path: ROUTES.VIP_INVESTOR_SERVICES, element: <ProtectedRoute element={<VIPInvestorServices />} /> },
            { path: ROUTES.USER, element: <ProtectedRoute element={<User />} /> }, // 'type' can be 'investor' or 'mentor'
            { path: ROUTES.ADMIN, element: <ProtectedRoute element={<Admin />} /> },
            { path: ROUTES.EMPLOYEE, element: <ProtectedRoute element={<Employee />} /> },
            { path: ROUTES.NOT_FOUND, element: <NotFound /> }, // Handles undefined routes
        ],
    },
]);

function App() {
    // const { appName } = useContext(ConfigContext);

    return (
        <>
            <ConfigProvider>
                <UserContextProvider>
                    <AisleContextProvider>
                        {/* <Helmet>
                            <title>{appName}</title> Use appName dynamically
                        </Helmet> */}
                        <RouterProvider router={router}></RouterProvider>
                    </AisleContextProvider>
                </UserContextProvider>
            </ConfigProvider>
        </>
    )
}

export default App
