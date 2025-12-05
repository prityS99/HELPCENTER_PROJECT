import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Wrapper from "../Layout/Wrapper";
import ContactUs from "../Pages/ContactUs/ContactUs";
import PlansPricing from "../Pages/Plans and Pricing/PlansPricing";
import TherapyPage from "../Pages/TherapyPage/TherapyPage";
import LoginPage from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProtectedRoute from "../Components/ProtectedRoute";
import AppointmentForm from "../Pages/AppointmentForm";
import WrapperAdmin from "../Pages/Admin/WrapperAdmin";
import Dashboard from "../Pages/Admin/Dashboard";
import TherapiesList from "../Pages/Admin/TherapiesList";
import AddCounselor from "../Pages/Admin/AddCouncelor";
import CounselorPage from "../Pages/CouncelorsList/CounselorPage";



const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "counselors", element: <CounselorPage /> },
      { path: "therapies", element: <TherapyPage /> },
      { path: "planspricing", element: <PlansPricing /> },
      { path: "contactus", element: <ContactUs /> },
      {
        path: "appointment",
        element: (
          <ProtectedRoute>
            <AppointmentForm />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <WrapperAdmin />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "councelors", element: <AddCounselor /> },
      { path: "therapies", element: <TherapiesList /> },
    ],
  },



  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <Signup /> },
]);

export default Routes;
