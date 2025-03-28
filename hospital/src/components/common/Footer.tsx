const Footer = () => {
    return (
      <footer className="bg-black text-white py-4 text-center">
        <div className="container mx-auto">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} MedicoHub. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/about" className="text-gray-300 hover:text-white transition">About</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition">Contact</a>
            <a href="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;