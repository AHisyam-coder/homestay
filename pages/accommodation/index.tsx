import Header from "@/components/header";
import PackageCard from "@/components/package-card";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function Accommodation() {
  const [accomodations, setAccomodations] = useState<any[]>([]);

  useEffect(() => {
    async function getAccomodation() {
      const { data, error } = await supabase
        .from('accomodations')
        .select('*')
        .throwOnError()

      if (error) {
        console.error('Error fetching accomodation:', error);
      } else {
        setAccomodations(data);
      }
    }

    getAccomodation();
  }, []);

  const rooms = accomodations.filter(x => x.type === "room");
  const packages = accomodations.filter(x => x.type === "package");

  const tabs = [
    {
      title: "Rooms",
      value: "rooms",
      content: (
        <div className="w-full relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-secondary grid grid-cols-1 md:grid-cols-3 md:overflow-hidden overflow-y-auto">
          {rooms.map(room => (
            <ProductCard
              key={room.id}
              id={room.id}
              imageSrc={`/${room.image_name}`}
              roomName={room.name}
              location={room.location}
              price={`RM${room.price}`}
              rating={room.rating}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Packages",
      value: "packages",
      content: (
        <div className="w-full relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-primary to-secondary grid grid-cols-1 md:grid-cols-3 md:overflow-hidden overflow-y-auto">
          {packages.map(pkg => (
            <PackageCard
              key={pkg.id}
              id={pkg.id}
              imageSrc={`/${pkg.image_name}`}
              roomName={pkg.name}
              location={pkg.location}
              price={`RM${pkg.price}`}
              rating={pkg.rating}
            />
          ))}
        </div>
      ),
    },
  ];

  if (!accomodations) {
    return (
      <div>
        <Skeleton className="relative isolate overflow-hidden py-16 sm:py-24 lg:py-32 bg-fixed">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <Skeleton className="relative z-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl lg:max-w-none flex justify-center">

              </div>
            </div>
          </Skeleton>
        </Skeleton>
        <Skeleton className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col mx-auto max-w-7xl w-full items-start justify-start mt-10 mb-28" />
      </div>
    )
  }

  return (
    <div>
      <Header/>
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
        {accomodations ? (<Tabs tabs={tabs} />) : (<div></div>)}
      </div>
    </div>
  );
}
