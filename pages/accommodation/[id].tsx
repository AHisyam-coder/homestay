import { Tabs } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import MultiColReviews from "@/components/multicol-review";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { GetServerSideProps } from "next";
import { supabase } from '@/utils/supabase'
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

interface DateRange {
  from: string | null;
  to: string | null;
}

interface Accomodation {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  description: string;
}

const product = {
  highlights: [
    "Hygiene at finest",
    "3000x3000ft room",
    "Suits for family of 10",
    "Ultra-comfort 100%",
  ],
  details:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
const reviews = { href: "#", average: 5, totalCount: 117 };



const images = [
  '/saba1.jpg',
  '/saba2.jpg',
  '/saba3.jpg',
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

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Booking() {
  const router = useRouter();
  const { id } = router.query;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [nights, setNights] = useState(0);
  const [location, setLocation] = useState('');
  const [accomodation, setAccomodation] = useState<Accomodation | null>(null);

  const handleThumbnailClick = (index: any) => {
    setCurrentIndex(index);
  };

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
    if (accomodation) {
      const amount = nights * accomodation?.price;

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
    }
  };

  useEffect(() => {
    async function getAccomodation() {
      if (id) {
        const { data, error } = await supabase
          .from('accomodations')
          .select('*')
          .eq('id', id)
          .throwOnError()
          .single()

        if (error) {
          console.error('Error fetching accomodation:', error);
        } else {
          setAccomodation(data);
        }
      }
    }

    getAccomodation();
  }, [id]);

  if (!accomodation) {
    return (
      <div >
        <div className="pt-6">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <Skeleton className="relative w-full max-h-96 max-w-2xl lg:max-w-7xl overflow-hidden" />
            <Skeleton className="mt-4 flex space-x-2" />
          </div>

          <Skeleton className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <Skeleton className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start " />
            </div>
          </Skeleton>
        </div>
      </div>
    )
  }

  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: (
        <div className="overflow-y-auto space-y-10 w-full h-full rounded-2xl p-10 text-xl md:text-4xl text-white bg-gradient-to-br from-primary to-secondary">
          <div>
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6">
              <p className="text-base">{accomodation?.description}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium ">Highlights</h3>
            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium ">Details</h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm ">{product.details}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Guest Reviews",
      value: "reviews",
      content: (
        <div className="w-full overflow-y-auto relative h-full rounded-2xl p-10 text-base font-bold text-white bg-gradient-to-br from-foreground to-primary">
          <MultiColReviews />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white">
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
                LOCATION
              </h3>
              <h1 className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Room Details
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        {/* Image gallery */}
        <div className="flex flex-col items-center">
          <div className="relative w-full max-h-96 max-w-2xl lg:max-w-7xl overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full overflow-hidden rounded-lg shadow-lg"
              >
                <motion.img
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex space-x-2">
            {images.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(index)}
                className={`h-20 w-16 cursor-pointer rounded-lg shadow-lg ${currentIndex === index ? 'ring-2 ring-primary' : 'opacity-60'
                  }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>


        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {accomodation.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              RM{accomodation.price}/night
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={classNames(
                        accomodation.rating > rating
                          ? "text-yellow-500"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{accomodation.rating} out of 5 stars</p>
                <span
                  className="ml-3 text-sm font-medium text-primary hover:text-secondary"
                >
                  {accomodation.rating} out of 5 stars
                </span>
              </div>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-between space-y-5">
                  <div className="mt-10 space-y-5 md:space-y-0">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 md:mb-0">Location</h3>
                      <div className="w-full md:w-auto">
                        {accomodation.location ? (
                          <Input disabled placeholder="Location" value={accomodation.location} />)
                          : (
                            <Select onValueChange={setLocation}>
                              <SelectTrigger className="w-full md:w-[228.13px] h-[44px]">
                                <SelectValue placeholder="Location" />
                              </SelectTrigger>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-5 md:space-y-0">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 md:mb-0">Check-in/Check-out</h3>
                      <div className="w-full md:w-auto">
                        <div className="flex justify-center w-full md:w-[228.13px] h-[44px]">
                          <DateRangePicker onUpdate={handleDateRangeUpdate} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2"
                >
                  Book
                </Button>
              </form>
            </div>

          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start ">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}