import { BentoTilt } from "./Features";

const Sponsors = ({ id }) => {
  return (
    <section id={id} className="bg-black pb-20">
      <div className="container mx-auto px-3 md:px-10">
        {/* Intro */}
        <div className="px-5 py-16">
          <p className="text-lg text-blue-50">Our Partners</p>
          <p className="max-w-md text-lg text-blue-50 opacity-50">
            Leading companies supporting innovation and technology excellence
          </p>
        </div>

        {/* Hero Sponsor */}
        <div className="relative mb-6 h-48 w-full overflow-hidden rounded-md md:h-96">
          <div className="relative size-full overflow-hidden rounded-md">
            <div className="absolute inset-0 bg-gray-600/20" />
            <div className="relative z-10 flex size-full flex-col justify-between p-3 md:p-5 text-blue-50">
              <div>
                <h1 className="bento-title special-font text-lg md:text-2xl lg:text-3xl">
                  PLATIN<b>U</b>M
                </h1>
                <p className="mt-2 max-w-64 text-xs md:text-sm opacity-80">
                  Premium partnership with exclusive benefits and maximum visibility
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-circular-web text-xs uppercase tracking-wider text-gray-300">
                  Platinum Sponsor
                </p>
                <div className="w-2 h-2 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid → stack on mobile */}
        <div className="flex flex-col gap-4 md:grid md:h-96 md:grid-cols-2 md:grid-rows-2">
          <div className="relative h-32 md:h-auto md:row-span-2">
            <div className="relative size-full overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-gray-600/20" />
              <div className="relative z-10 flex size-full flex-col justify-between p-3 md:p-4 text-blue-50">
                <div>
                  <h1 className="bento-title special-font text-lg md:text-xl lg:text-2xl">
                    TECH <b>C</b>ORP
                  </h1>
                  <p className="mt-2 max-w-64 text-xs md:text-sm opacity-80">
                    Leading technology solutions provider
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-circular-web text-xs uppercase tracking-wider text-gray-300">
                    Platinum Sponsor
                  </p>
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-32 md:h-auto">
            <div className="relative size-full overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-yellow-600/20" />
              <div className="relative z-10 flex size-full flex-col justify-between p-3 md:p-4 text-blue-50">
                <div>
                  <h1 className="bento-title special-font text-lg md:text-xl lg:text-2xl">
                    INNOV<b>A</b>TE
                  </h1>
                  <p className="mt-2 max-w-64 text-xs md:text-sm opacity-80">
                    Cutting-edge research and development
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-circular-web text-xs uppercase tracking-wider text-yellow-300">
                    Gold Sponsor
                  </p>
                  <div className="w-2 h-2 rounded-full bg-yellow-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-32 md:h-auto">
            <div className="relative size-full overflow-hidden rounded-md">
              <div className="absolute inset-0 bg-blue-400/20" />
              <div className="relative z-10 flex size-full flex-col justify-between p-3 md:p-4 text-blue-50">
                <div>
                  <h1 className="bento-title special-font text-lg md:text-xl lg:text-2xl">
                    DIGIT<b>A</b>L
                  </h1>
                  <p className="mt-2 max-w-64 text-xs md:text-sm opacity-80">
                    Digital transformation experts
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-circular-web text-xs uppercase tracking-wider text-blue-400">
                    Silver Sponsor
                  </p>
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

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
