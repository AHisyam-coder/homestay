import Image from "next/image";
import { Piazzolla } from "next/font/google";
import { ImagesSlider } from "@/components/ui/images-slider";
import { motion } from "framer-motion";
import Header from "@/components/header";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Feature from "@/components/feature";
import Review from "@/components/review";
import { PlacesInterest } from "@/components/places-interest";
import { FeaturedAccomodation } from "@/components/featured-accomodation";
import { z } from "zod";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Badge } from "@/components/ui/badge";

interface DateRange {
  from: string | null;
  to: string | null;
}

const images = [
  "/house-near-body-water-forest.jpg",
  "/homestay-bg-1.jpg",
  "/homestay-bg-2.jpg",
];

const states = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Sabah",
  "Putrajaya",
];

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Home() {
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [nights, setNights] = useState(0);
  const [location, setLocation] = useState('');
  const [accomodation, setAccomodation] = useState('');

  const handleDateRangeUpdate = (range: any) => {
    setRange(range.range);
  };

  useEffect(() => {
    const calculateNights = (): number => {
      if (!range.from || !range.to) return 0;
      const start = new Date(range.from).getTime();
      const end = new Date(range.to).getTime();
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return diff;
    };

    const nights = calculateNights();
    setNights(nights);
  }, [range]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let price: number = 0;

    if (location === "") {
      alert("Please choose location!");
      return;
    }

    if (accomodation === "") {
      alert("Please choose an accomodation!");
      return;
    } else {
      switch (accomodation) {
        case "family":
          price = 330;
          break;
        case "quad":
          price = 230;
          break;
        case "standard":
          price = 130;
          break;
        case "famPckg":
          price = 5000;
          break;
        case "wedPckg":
          price = 5000;
          break;
        case "gatPckg":
          price = 5000;
          break;
      }
    }

    const amount = nights * price;

    if (amount !== 0) {
      const stripe = await stripePromise;
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const session = await response.json();

      if (stripe)
        await stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      alert("Please choose date range at least one night.");
    }
  };

  return (
    <div>
      <ImagesSlider className="h-[40rem]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p
            className={`font-bold text-m md:text-m text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4`}
          >
            BEST CHOICE FOR FAMILY AND FRIENDS
          </motion.p>
          <motion.p
            className={`font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4`}
          >
            Your Home Away from Home Awaits
          </motion.p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto pt-14">
              <div className="w-full md:w-auto">
                <Select onValueChange={setLocation}>
                  <SelectTrigger className="w-[258px] h-[44px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-auto">
                <DateRangePicker onUpdate={handleDateRangeUpdate} />
              </div>
              <div className="w-full md:w-auto">
                <Select onValueChange={setAccomodation}>
                  <SelectTrigger className="w-[258px] h-[44px]">
                    <SelectValue placeholder="Select a room/package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rooms</SelectLabel>
                      <SelectItem value="family">
                        Family Suite <Badge className="ml-4" variant="default">330/night</Badge>
                      </SelectItem>
                      <SelectItem value="quad">
                        Quad Room
                        <Badge className="ml-4" variant="default">230/night</Badge>
                      </SelectItem>
                      <SelectItem value="standard">
                        Standard Room
                        <Badge className="ml-4" variant="default">130/night</Badge>
                      </SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Packages</SelectLabel>
                      <SelectItem value="famPckg">
                        Family Day Package
                        <Badge className="ml-1" variant="default">5000/night</Badge>
                      </SelectItem>
                      <SelectItem value="wedPckg">
                        Wedding Package
                        <Badge className="ml-4" variant="default">5000/night</Badge>
                      </SelectItem>
                      <SelectItem value="gatPckg">
                        Gathering Package
                        <Badge className="ml-3" variant="default">5000/night</Badge>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full md:w-[100px] h-[44px]">Find</Button>
            </div>
          </form>
        </motion.div>
      </ImagesSlider>
      <Feature />
      <Review />
      <FeaturedAccomodation />
      <PlacesInterest />
    </div>
  );
}
