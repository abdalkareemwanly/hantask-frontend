import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./admin/Components/DefaultLayout";
import Index from "./admin/pages/index/Index";
import Languages from "./admin/pages/Languages/Languages";
import Pagenotfound from "./Components/Pagenotfound";
import Users from "./admin/pages/users/Users";
import EditWord from "./admin/pages/Languages/EditWord";
import AdminLogin from "./admin/pages/Auth/admin/AdminLogin";
import AdminLogout from "./admin/pages/Auth/admin/AdminLogout";
import ArchivedUsers from "./admin/pages/users/ArchivedUsers";
import Categories from "./admin/pages/categories/Categories";
import SubCategories from "./admin/pages/subCategories/SubCategories";
import ChildCategories from "./admin/pages/childCategories/ChildCategories";
import Countries from "./admin/pages/locations/countries";
import Cities from "./admin/pages/locations/Cities";
import Areas from "./admin/pages/locations/Areas";
import Tax from "./admin/pages/tax/Tax";
import Roles from "./admin/pages/admins manager/roles/Roles";
import RolesPermissions from "./admin/pages/admins manager/roles/RolesPermissions";
import Admins from "./admin/pages/admins manager/adminControl/Admins";
import Posts from "./admin/pages/posts/Posts";
import Chat from "./admin/pages/chat/Chat";
import Homepage from "./website/pages/home/Homepage";
import Layout from "./website/components/layout/websiteLayout/Layout";
import Subscription from "./website/pages/subscription/Subscription";
import PostJobs from "./website/pages/jobs/PostJobs";
import Policy from "./website/pages/policy/Policy";
import Condition from "./website/pages/condition/Condition";
import Contact from "./website/pages/contact/Contact";
import Login from "./website/pages/login/Login";
import Register from "./website/pages/Register/Register";
import ForgotPassword from "./website/pages/forgotPassword/ForgotPassword";
import VerifyEmail from "./website/pages/verifyEmail/VerifyEmail";
import JobDetail from "./website/pages/jobDetail/JobDetail";
import BuyerProfile from "./website/pages/buyerProfile/BuyerProfile";
const router = createBrowserRouter([
  {
    path: "/admin/",
    element: <DefaultLayout />,
    children: [
      {
        path: "dashboard",
        element: <Index />,
      },
      { path: "dashboard/chat/all", element: <Chat /> },
      { path: "dashboard/users", element: <Users /> },
      { path: "dashboard/archivedUsers", element: <ArchivedUsers /> },
      { path: "dashboard/categories", element: <Categories /> },
      { path: "dashboard/subCategories", element: <SubCategories /> },
      { path: "dashboard/childs", element: <ChildCategories /> },
      { path: "dashboard/locations/countries", element: <Countries /> },
      { path: "dashboard/locations/cities", element: <Cities /> },
      { path: "dashboard/locations/areas", element: <Areas /> },
      { path: "dashboard/locations/tax", element: <Tax /> },
      { path: "dashboard/admins", element: <Admins /> },
      { path: "dashboard/posts", element: <Posts /> },
      {
        path: "dashboard/rolesControl",
        children: [
          {
            path: "",
            element: <Roles />,
          },
          {
            path: ":id",
            element: <RolesPermissions />,
          },
        ],
      },

      {
        path: "logout",
        element: <AdminLogout />,
      },
      {
        path: "EditWord",
        element: <EditWord />,
      },
      {
        path: "languages",
        element: <Languages />,
      },
    ],
  },
  {
    path: "/admin/*",
    element: <AdminLogin />,
  },
  {
    path: "*",
    element: <Pagenotfound />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "jobs",
        element: <PostJobs />,
      },
      {
        path: "job-detail",
        element: <JobDetail />,
      },
      {
        path: "buyer-profile",
        element: <BuyerProfile />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify",
        element: <VerifyEmail />,
      },
      {
        path: "policy",
        element: (
          <Policy
            policyContent={
              <>
                <div>policy here</div>
              </>
            }
          />
        ),
      },
      {
        path: "condition",
        element: (
          <Condition
            conditionContent={
              <>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat blanditiis accusantium hic atque magni beatae aliquam facilis cupiditate dolorum ab!</div>
              </>
            }
          />
        ),
      },
    ],
  },
]);

export default router;
