import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderInfo() {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-around">
      <div className=" grid grid-cols-3 items-center gap-4">
        <div className="flex items-center justify-center col-span-1">
          <div className="flex items-center justify-center w-12 h-12 border-2 border-secondary rounded-full">
            <Mail className="text-secondary" />
          </div>
        </div>
        <div className="col-span-2">
          <dt className="text-gray-500">Email Us</dt>
          <dd className="font-medium text-lg text-gray-900 text-secondary">example@example.com</dd>
        </div>
      </div>
      <div className="pt-6 md:pt-0">
        <Link href="/">
          <Image src="/Home.png" alt="logo" width={150} height={150} />
        </Link>
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold text-secondary">+(60) 12-3456789</h1>
      </div>
    </div>
  );
}
