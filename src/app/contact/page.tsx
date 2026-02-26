import PageBanner from "../../components/common/PageBanner";
import ContactSection from "../../components/contact/ContactSection";
import FeaturesStrip from "../../components/common/FeaturesStrip";

export default function ContactPage() {
  return (
    <main className="bg-[#fcfaf7]">
      <PageBanner
        title="Concierge"
        breadcrumb="Contact"
        imageSrc="/contact-banner.png"
      />

      {/* The redesigned section handles its own spacing and responsiveness */}
      <ContactSection />

      {/* <div className="pb-20"> */}
        <FeaturesStrip />
      {/* </div> */}
    </main>
  );
}