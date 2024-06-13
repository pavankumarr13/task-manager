import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm  text-blue-900 fixed bottom-0 w-full   h-14">
      <div
        className="flex  justify-center items-center
      w-full md:w-3/4 h-full gap-2 font-bold"
      >
        <FaRegCopyright className="font-bold text-base" />
        <p className="text-base ">Copyright 2024</p>
      </div>
    </footer>
  );
};
export default Footer;
