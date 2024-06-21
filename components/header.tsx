import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerOverlay, DrawerClose } from "./ui/drawer"; // Adjust import path as necessary
import { NextPage } from "next";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Accommodation", href: "/accommodation" },
  // Add more navigation items here if needed
];

const Header: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="inset-x-0 top-0 z-50 bg-gradient-to-t from-blue-300 to-primary">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        
        <div className="hidden lg:flex lg:gap-x-12 justify-center flex-grow">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-primary-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex lg:hidden">
          <Button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </nav>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerOverlay />
        <DrawerContent className="fixed inset-y-0 right-0 z-50 w-full max-w-sm p-6 overflow-y-auto bg-white sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className="h-8 w-auto"
                src="/your-logo.svg"
                alt="Your Company Logo"
                width={32}
                height={32}
              />
            </Link>
            <DrawerClose asChild>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </DrawerClose>
          </div>
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
