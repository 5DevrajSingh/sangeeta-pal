import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/layout/Header";
import ScrollManager from "./components/common/ScrollManager";

import HeroSection from "./sections/home/HeroSection";
import DoctorIntroSection from "./sections/home/DoctorIntroSection";
import AboutSection from "./sections/home/AboutSection";
import ServicesSection from "./sections/home/ServicesSection";
import ContactSection from "./sections/home/ContactSection";

import GallerySlider from "./components/common/GallerySlider";
import GalleryPage from "./pages/GalleryPage";

import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";

import PatientStoriesSection from "./sections/home/PatientStoriesSection";
import Footer from "./components/layout/Footer";
import LegalPage from "./pages/LegalPage";

function HomePage() {
  return (
    <main id="home">
      <HeroSection />
      <DoctorIntroSection />
      <AboutSection />

      <ServicesSection />
      <GallerySlider id="gallery" />
      <ContactSection />
      <PatientStoriesSection />

    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/services/:serviceId"
          element={<ServiceDetailsPage />}
        />

        <Route
          path="*"
          element={
            <main className="px-4 py-20 text-center">
              <h1 className="text-3xl font-bold text-green-950">
                Page not found
              </h1>
              <Link
                to="/"
                className="mt-5 inline-block text-green-700 underline"
              >
                Go to Home
              </Link>
            </main>
          }
        />
        <Route
          path="/doctors/:doctorId"
          element={<DoctorDetailsPage />}
        />
        <Route path="/#gallery" element={<GalleryPage />} />
        <Route
          path="/privacy-policy"
          element={<LegalPage title="Privacy Policy" />}
        />

        <Route
          path="/terms-and-conditions"
          element={<LegalPage title="Terms & Conditions" />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}