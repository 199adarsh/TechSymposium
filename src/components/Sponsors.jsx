import { SponsorCard } from "./sponsorcard";

const Sponsors = ({ id }) => {
  // Sample sponsor data matching the original structure
const sponsorItems = [
  {
    time: "Platinum Sponsor",
    name: "TECH CORP",
    collection:
      "Leading technology solutions provider with innovative IT infrastructure and cloud services",
    imageSrc: "https://logo.clearbit.com/ibm.com",
    website: "https://www.ibm.com",
  },
  {
    time: "Gold Sponsor",
    name: "INNOVATE",
    collection:
      "Cutting-edge research and development in artificial intelligence and machine learning",
    imageSrc: "https://logo.clearbit.com/openai.com",
    website: "https://openai.com",
  },
  {
    time: "Silver Sponsor",
    name: "DIGITAL",
    collection:
      "Digital transformation experts specializing in enterprise solutions and automation",
    imageSrc: "https://logo.clearbit.com/accenture.com",
    website: "https://www.accenture.com",
  },
  {
    time: "Platinum Sponsor",
    name: "PLATINUM PARTNER",
    collection:
      "Premium partnership with exclusive benefits and maximum visibility across all events",
    imageSrc: "https://logo.clearbit.com/microsoft.com",
    website: "https://www.microsoft.com",
  },
  {
    time: "Gold Sponsor",
    name: "GOLD SPONSOR",
    collection:
      "Major sponsor supporting innovation and technology excellence in education",
    imageSrc: "https://logo.clearbit.com/google.com",
    website: "https://www.google.com",
  },
  {
    time: "Silver Sponsor",
    name: "SILVER SPONSOR",
    collection:
      "Supporting partner committed to fostering technical talent and creativity",
    imageSrc: "https://logo.clearbit.com/amazon.com",
    website: "https://www.amazon.com",
  },
]


  return (
    <section id={id} className="bg-black pb-20">
      <div className="container mx-auto px-3 md:px-10">
        {/* Intro */}
        <div className="py-16">
          
        </div>

        {/* Sponsor Carousel */}
        <SponsorCard
          title="Our Valued Sponsors"
          subtitle="Partnering with industry leaders to bring you the best tech symposium experience"
          items={sponsorItems}
        />

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="font-circular-web text-lg text-blue-50/80 mb-4">
            Want to join us as a sponsor?
          </p>
          <button className="bg-yellow-300 text-black px-6 py-2 rounded-full font-circular-web font-medium hover:bg-yellow-400 transition-all duration-300 hover:scale-105">
            Become a Sponsor
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
