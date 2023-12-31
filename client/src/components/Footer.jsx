import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full px-4 sm:px-9 md:px-12 lg:px-20 xl:px-32 2xl:px-40 py-10">
      <hr className=" mb-6 border-none outline-none h-[1px] w-full bg-gray-300 dark:bg-[#cbd5e11a]" />
      <div className="w-full flex items-center justify-between">
        <span className="text-sm text-slate-700 dark:text-gray-300">
          &copy; 2024 All Rights Reserved
        </span>
        <Link className="text-sm capitalize text-slate-700 dark:text-gray-300">
          follow us on
          <i className="fa-brands fa-github ms-2 text-2xl"></i>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
