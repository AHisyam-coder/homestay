// components/Feature.tsx
import {
  BedDouble,
  FlameKindling,
  Heater,
  Home,
  Key,
  MapPin,
  SquareParking,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import AnimatedSection from "./animated-section";
import { motion } from "framer-motion";

// Define a type for icon keys
type IconKey = "wifi" | "utensils" | "bbq" | "bed" | "pool" | "parking";

// Define the type for feature objects
interface Feature {
  name: string;
  description: string;
  icon: IconKey;
}

const features: Feature[] = [
  {
    name: "Free high speed wifi",
    description: "All rooms have good high speed Wi-Fi connectivity",
    icon: "wifi",
  },
  {
    name: "Well equipped kitchen",
    description:
      "Fall in love with the neighborhood, a hub for culture, entertainment",
    icon: "utensils",
  },
  {
    name: "Outdoor BBQ area",
    description: "We does not serve alcoholic beverages.",
    icon: "bbq",
  },
  {
    name: "Furnished rooms",
    description:
      "With three workout facilities, it's easy to stay active all year.",
    icon: "bed",
  },
  {
    name: "Swimming pool",
    description: "Everyday chores made easier equals more time for living.",
    icon: "pool",
  },
  {
    name: "Parking",
    description:
      "Enjoy our urban oasis filled with green lawns, tree-lined paths, athletic.",
    icon: "parking",
  },
];

const iconMapping: Record<IconKey, FC> = {
  wifi: Wifi,
  utensils: Utensils,
  bbq: FlameKindling,
  bed: BedDouble,
  pool: Waves,
  parking: SquareParking,
};

export default function Feature() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 pt-24  lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <AnimatedSection
            title="Some Word About Us"
            className=" text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </AnimatedSection>
          <AnimatedSection
            title="Amenities"
            className=" text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => {
                const IconComponent = iconMapping[feature.icon];
                return (
                  <div
                    key={feature.name}
                    className="border-t border-gray-200 pt-4 grid grid-cols-3 items-center gap-4"
                  >
                    <div className="flex items-center justify-center col-span-1">
                      <motion.div
                        className="flex items-center justify-center w-12 h-12 border-2 border-secondary hover:border-blue-200 rounded-full"
                        onHoverStart={() => setHovered(feature.name)}
                        onHoverEnd={() => setHovered(null)}
                        animate={{
                          scale: hovered === feature.name ? 1.2 : 1,
                          backgroundColor:
                            hovered === feature.name ? "#5995de" : "#fcfcfc", 
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {IconComponent && (
                          <IconComponent
                            className="text-secondary"
                            style={{
                              color:
                                hovered === feature.name
                                  ? "#fcfcfc"
                                  : "#5995de", 
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                    <div className="col-span-2">
                      <dt className="font-semibold text-gray-900 hover:text-primary">
                        {feature.name}
                      </dt>
                      <dd className="text-sm text-gray-500">
                        {feature.description}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </AnimatedSection>
        </div>
        <div className="flex items-center justify-center ">
          <Image
            src="/saba1.jpg"
            alt="saba1"
            className="rounded-lg bg-gray-100 drop-shadow-2xl"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
