import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollManager from "./components/ScrollManager";
import PageLoader from "./components/ui/PageLoader";
import SiteLayout from "./layouts/SiteLayout";

const Home = lazy(() => import("./pages/Home"));
const Features = lazy(() => import("./pages/Features"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));
const Product = lazy(() => import("./pages/Product"));
const Cards = lazy(() => import("./pages/Cards"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Business = lazy(() => import("./pages/Business"));
const Security = lazy(() => import("./pages/Security"));
const About = lazy(() => import("./pages/About"));
const Careers = lazy(() => import("./pages/Careers"));
const CareerDetail = lazy(() => import("./pages/CareerDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Help = lazy(() => import("./pages/Help"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Legal = lazy(() => import("./pages/Legal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Overview = lazy(() => import("./pages/dashboard/Overview"));
const Transactions = lazy(() => import("./pages/dashboard/Transactions"));
const DashboardCards = lazy(() => import("./pages/dashboard/DashboardCards"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));

const App = () => (
  <>
    <ScrollManager />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="features/:slug" element={<FeatureDetail />} />
          <Route path="product" element={<Product />} />
          <Route path="cards" element={<Cards />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="business" element={<Business />} />
          <Route path="security" element={<Security />} />
          <Route path="about" element={<About />} />
          <Route path="careers" element={<Careers />} />
          <Route path="careers/:slug" element={<CareerDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="help" element={<Help />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="privacy" element={<Legal doc="privacy" />} />
          <Route path="terms" element={<Legal doc="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="cards" element={<DashboardCards />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound compact />} />
        </Route>
      </Routes>
    </Suspense>
  </>
);

export default App;
