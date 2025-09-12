import Link from 'next/link';
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-light dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center group">
              <FaLeaf className="h-6 w-6 text-primary mr-2 group-hover:text-primary-dark transition-colors duration-300" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary dark:text-white font-heading tracking-tight group-hover:text-primary-dark transition-colors duration-300">
                SmartFarmGH
              </span>
            </Link>
            <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
              Empowering Ghanaian farmers with intelligent farming solutions through AI and SMS technology.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/knowledge-base" className="hover:underline hover:text-primary transition-colors duration-300">Knowledge Base</Link>
                </li>
                <li>
                  <Link href="/chatbot" className="hover:underline hover:text-primary transition-colors duration-300">AI Assistant</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://facebook.com" className="hover:underline hover:text-primary flex items-center transition-colors duration-300" target="_blank" rel="noreferrer">
                    <FaFacebook className="mr-2" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" className="hover:underline hover:text-primary flex items-center transition-colors duration-300" target="_blank" rel="noreferrer">
                    <FaTwitter className="mr-2" /> Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/privacy-policy" className="hover:underline hover:text-primary transition-colors duration-300">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="hover:underline hover:text-primary transition-colors duration-300">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear} <Link href="/" className="hover:underline">SmartFarmGH™</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors duration-300 transform hover:scale-110">
              <FaFacebook className="w-5 h-5" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors duration-300 transform hover:scale-110">
              <FaTwitter className="w-5 h-5" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors duration-300 transform hover:scale-110">
              <FaInstagram className="w-5 h-5" />
              <span className="sr-only">Instagram page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;