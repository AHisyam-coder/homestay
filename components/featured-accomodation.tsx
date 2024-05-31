"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DirectionAwareHover } from "./ui/direction-aware-hover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

export function FeaturedAccomodation() {
  return (
    <div className="bg-primary">
      <div className="h-auto relative flex flex-col sm:flex-row items-center justify-center p-4 sm:p-8">
        <div className="flex flex-col text-center sm:text-left mb-4 sm:mr-10">
          <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 sm:text-4xl">
            Accommodation
          </h2>
          <h3 className="text-base font-bold tracking-tight text-neutral-300 sm:text-lg mt-4">
            Choose From Wide Range of Our Rooms
          </h3>
          <Link href="/accommodation">
            <Button className="bg-secondary-foreground hover:bg-secondary mt-10">
              View More
            </Button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 ">
          <DirectionAwareHover
            imageUrl="/saba2.jpg"
            className="w-full sm:w-auto"
          >
            <p className="font-bold text-xl">Family Suite</p>
            <p className="font-normal text-sm">RM330 / night</p>
          </DirectionAwareHover>
          <DirectionAwareHover
            imageUrl="/saba4.jpg"
            className="w-full sm:w-auto"
          >
            <p className="font-bold text-xl">Quad Room</p>
            <p className="font-normal text-sm">RM230 / night</p>
          </DirectionAwareHover>
          <DirectionAwareHover
            imageUrl="/saba6.jpg"
            className="w-full sm:w-auto"
          >
            <p className="font-bold text-xl">Standard Room</p>
            <p className="font-normal text-sm">RM130 / night</p>
          </DirectionAwareHover>
        </div>
      </div>
    </div>
  );
}
