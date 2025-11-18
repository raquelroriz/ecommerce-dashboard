
function Footer() {
  return (
    <footer className="mt-8 border-t border-brand-100 bg-brand-50">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Online Shop Kel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;