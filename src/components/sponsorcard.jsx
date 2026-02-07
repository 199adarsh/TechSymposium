import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./card"
import Button from "./Button"

export const SponsorCard = ({ title, subtitle, items }) => {
  const [index, setIndex] = React.useState(0)
  const [itemsToShow, setItemsToShow] = React.useState(3)

  // Responsive cards count
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

  // Auto-scroll
  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1))
    }, 3000)
    return () => clearInterval(id)
  }, [maxIndex])

  return (
    <Card className="mx-auto mt-16 w-full max-w-5xl bg-neutral-900/60 border border-white/10">
      
      {/* HEADER */}
      <CardHeader className="border-b border-white/10 px-4 sm:px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
              {title}
            </CardTitle>
            <p className="mt-1 text-sm text-neutral-400">
              {subtitle}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setIndex(index <= 0 ? maxIndex : index - 1)}
            >
              ‹
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => setIndex(index >= maxIndex ? 0 : index + 1)}
            >
              ›
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* 🔧 SPACE BETWEEN HEADER & CARDS */}
      <div className="h-4 sm:h-6" />

      {/* CONTENT */}
      <CardContent className="overflow-hidden px-4 sm:px-6 pb-6">
        <div
          className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out"
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
              {/* 🔧 FORCE EQUAL HEIGHT */}
              <div className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-white/10 bg-neutral-900 p-4 sm:p-6">
                  
                  {/* IMAGE */}
                  <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-neutral-800">
                    {item.imageSrc ? (
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-sm text-neutral-500">
                        No Logo
                      </span>
                    )}
                  </div>

                  {/* TEXT (flex-grow ensures same height) */}
                  <div className="flex flex-1 flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                      {item.collection}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
