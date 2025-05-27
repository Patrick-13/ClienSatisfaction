import { Facebook, Twitter, Instagram } from 'lucide-react'; // optional icons

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10 text-sm text-black dark:text-white/70 mt-4">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-base font-semibold">© 2025 DENR. All rights reserved.</p>

        <div className="flex justify-center gap-6">
          <a href="#" aria-label="Facebook" className="hover:text-blue-600">
            <Facebook size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <Twitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-500">
            <Instagram size={20} />
          </a>
        </div>

        <div className="space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
