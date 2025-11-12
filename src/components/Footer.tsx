
function Footer() {
  return (
    <footer className="mt-8 border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-gray-500 bg-pink-200">
        © {new Date().getFullYear()} Online Shop Kel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;