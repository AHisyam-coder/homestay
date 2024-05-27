import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs } from "@/components/ui/tabs";
import { CookingPot, LucideSquareMenu } from "lucide-react";

export default function Accommodation() {
  const tabs = [
    {
      title: "Rooms",
      value: "rooms",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-secondary">
          <ProductCard/>
        </div>
      ),
    },
    {
      title: "Packages",
      value: "packages",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-secondary">
          <p>Packages tab</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 bg-fixed"
        style={{
          backgroundImage: 'url("/house-near-body-water-forest.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl lg:max-w-none flex justify-center">
              <h3 className="font-bold text-m md:text-m text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
                What We Offers
              </h3>
              <h1 className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Accomodations
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto max-w-7xl w-full items-start justify-start mt-10 mb-28">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}
