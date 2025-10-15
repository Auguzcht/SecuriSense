const Footer = () => {
  return (
    <footer className="w-full bg-[#042046] text-white py-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} SecuriSense. All rights reserved.</p>
        <div className="flex gap-6 text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;