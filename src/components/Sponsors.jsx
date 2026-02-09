import { SponsorCard } from "./sponsorcard"

const Sponsors = ({ id }) => {
  const sponsorItems = [
    {
      time: "Platinum",
      name: "Microsoft",
      collection: "Cloud computing, AI, and developer tools.",
      imageSrc: "https://logo.clearbit.com/microsoft.com",
      website: "https://www.microsoft.com",
    },
    {
      time: "Gold",
      name: "Google",
      collection: "Search, cloud services, and machine learning.",
      imageSrc: "https://logo.clearbit.com/google.com",
      website: "https://www.google.com",
    },
    {
      time: "Gold",
      name: "IBM",
      collection: "Enterprise software and hybrid cloud.",
      imageSrc: "https://logo.clearbit.com/ibm.com",
      website: "https://www.ibm.com",
    },
    {
      time: "Silver",
      name: "Amazon Web Services",
      collection: "Scalable cloud infrastructure.",
      imageSrc: "https://logo.clearbit.com/amazon.com",
      website: "https://aws.amazon.com",
    },
    {
      time: "Silver",
      name: "Accenture",
      collection: "Technology consulting and transformation.",
      imageSrc: "https://logo.clearbit.com/accenture.com",
      website: "https://www.accenture.com",
    },
    {
      time: "Bronze",
      name: "OpenAI",
      collection: "Advanced AI research and deployment.",
      imageSrc: "https://logo.clearbit.com/openai.com",
      website: "https://openai.com",
    },
  ]

  return (
    <section id={id} className="bg-black py-32">
      <div className="mx-auto w-[90vw] max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">
            Sponsors
          </p>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-white">
            Designed with leaders
          </h2>
          <p className="text-base text-white/60">
            Partnering with companies that value clarity and long-term thinking.
          </p>
        </div>

        <SponsorCard items={sponsorItems} />
      </div>
    </section>
  )
}

export default Sponsors
