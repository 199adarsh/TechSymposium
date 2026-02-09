import * as React from "react"

const tierStyles = {
  Platinum:
    "bg-gradient-to-r from-purple-500/20 to-purple-500/10 text-purple-300 border border-purple-400/30 rounded-full",
  Gold:
    "bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 text-yellow-300 border border-yellow-400/30 rounded-full",
  Silver:
    "bg-gradient-to-r from-gray-400/20 to-gray-400/10 text-gray-300 border border-gray-400/30 rounded-full",
  Bronze:
    "bg-gradient-to-r from-orange-500/20 to-orange-500/10 text-orange-300 border border-orange-400/30 rounded-full",
}

export const SponsorCard = ({ items }) => {
  const [index, setIndex] = React.useState(0)
  const [itemsToShow, setItemsToShow] = React.useState(3)

  React.useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setItemsToShow(1)
      else if (window.innerWidth < 1024) setItemsToShow(2)
      else setItemsToShow(3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const maxIndex = Math.max(items.length - itemsToShow, 0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 6000)
    return () => clearInterval(id)
  }, [maxIndex])

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="absolute -top-12 right-0 flex gap-2">
        <button
          onClick={() => setIndex(index <= 0 ? maxIndex : index - 1)}
          className="h-9 w-9 rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          ←
        </button>
        <button
          onClick={() => setIndex(index >= maxIndex ? 0 : index + 1)}
          className="h-9 w-9 rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          →
        </button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${index * (100 / itemsToShow)}%)`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.07]">
                {/* Badge */}
                <span
                  className={`mb-4 inline-block px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${
                    tierStyles[item.time]
                  }`}
                >
                  {item.time}
                </span>

                {/* Logo */}
                <div className="mb-5 flex h-10 items-center">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="max-h-full max-w-[110px] object-contain opacity-80"
                  />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-base font-medium text-white">
                  {item.name}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-white/60">
                  {item.collection}
                </p>

                <button
                  onClick={() => window.open(item.website, "_blank")}
                  className="relative flex cursor-pointer items-center gap-0.5 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm px-2 py-1 text-[9px] uppercase text-white md:px-4 md:py-2 md:text-xs border border-white/20 flex-shrink-0 transition-all duration-300 hover:bg-white/20"
                >
                  <span className="relative z-10">Visit Website</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
