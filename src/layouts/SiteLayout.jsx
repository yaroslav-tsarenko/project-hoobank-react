import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageLoader from "../components/ui/PageLoader";
import SupportChat from "../components/widgets/SupportChat";
import styles from "../style";

/** Shared marketing layout: sticky navbar, page outlet, footer, support chat. */
const SiteLayout = () => (
  <div className="bg-primary w-full min-h-screen overflow-x-clip flex flex-col">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-[10px] focus:bg-blue-gradient focus:text-primary font-poppins"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </main>
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={styles.boxWidth}>
        <Footer />
      </div>
    </div>
    <SupportChat />
  </div>
);

export default SiteLayout;
