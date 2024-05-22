import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function HeaderInfo() {
  return (
    <div className="flex justify-around">
      <div className="grid grid-rows-2 grid-flow-col gap-2 pt-6">
        <div className="flex items-center justify-center row-span-3">
          <div className="flex items-center justify-center w-12 h-12 border-4 border-blue-800 rounded-full">
            <Mail className="text-blue-800 " />
          </div>
        </div>
        <div className="col-span-2 content-end">Email Us</div>
        <div className="row-span-2 col-span-2">example@example.com</div>
      </div>
      <div>
        <Image src="/logo.png" alt="logo" width={150} height={150} />
      </div>
      <div className="pt-6">+(60) 12-3456789</div>
    </div>
  );
}
