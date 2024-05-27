import {
  Facebook,
  FacebookIcon,
  Instagram,
  InstagramIcon,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 bg-primary text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-base ">© 2024 Homestay. All Rights Reserved.</h1>
        </div>
        <div className="mb-4 md:mb-0">
          <p>
            Developed by <b>@AhmdHisyam</b>
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="text-2xl hover:text-gray-400" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="text-2xl hover:text-gray-400" />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="text-2xl hover:text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
