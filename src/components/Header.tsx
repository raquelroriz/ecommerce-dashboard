import UserMenu from "./UserMenu.tsx";
import FavoriteToggleButton from "./FavoriteToggleButton.tsx";
import { useFavorites } from "../context/FavoriteContext.tsx";
import {Link, useMatch, useNavigate} from "react-router-dom";
import {useCart} from "../context/CartContext.tsx";

export type Category = 'all' | 'eyes' | 'skin' | 'lips' | 'nails';

type HeaderProps = {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
};

function CategoryButton({label, value, active, onClick}: {
  label: string;
  value: Category;
  active: boolean;
  onClick: (c: Category) => void
}) {
  return (
    <button
      className={`rounded-full px-3 py-1 ${active ? 'bg-brand-600 text-white hover:bg-brand-600' : 'bg-white border border-brand-200 hover:bg-brand-50'}`}
      aria-pressed={active}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export default function Header({selectedCategory, onCategoryChange, searchQuery, onSearchChange}: HeaderProps) {
  const {count} = useCart();
  const {setOnlyFavorites} = useFavorites();
  const navigate = useNavigate();
  // Hide category filter bar on product details page
  const isProductDetails = !!useMatch("/product/:id");
  return (
    <header className="border-b border-brand-100 bg-brand-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        {/* Store name */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            onClick={() => {
              onCategoryChange('all');
              onSearchChange('');
              setOnlyFavorites(false);
            }}
            className="font-serif text-3xl font-bold tracking-tight"
            aria-label="Go to home and see all items"
            title="Online Shop Kel"
          >
            Online Shop Kel
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              {/* magnifier icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd"
                      d="M10 3.75a6.25 6.25 0 1 0 3.9 11.2l4.55 4.55a.75.75 0 1 0 1.06-1.06l-4.55-4.55A6.25 6.25 0 0 0 10 3.75Zm-4.75 6.25a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0Z"
                      clipRule="evenodd"/>
              </svg>
            </span>
            <input
              id="search"
              type="text"
              placeholder="Search by name or type..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-full border border-brand-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            />
          </div>
        </div>

        {/* Actions (favorites, cart, login) */}
        <nav className="flex items-center gap-4">
          <FavoriteToggleButton/>

          {/* Cart icon with badge and link */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center rounded-full border border-brand-200 bg-white px-3 py-2 text-sm hover:bg-brand-50"
            aria-label="Cart"
            title="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="h-5 w-5">
              <path
                d="M2.25 3a.75.75 0 0 0 0 1.5h1.386l.955 9.549A2.25 2.25 0 0 0 6.83 16.125h8.79a2.25 2.25 0 0 0 2.238-2.076l.66-7.425A.75.75 0 0 0 17.775 6H5.99l-.13-1.3A1.5 1.5 0 0 0 4.636 3H2.25Zm5.25 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
            </svg>
            {count > 0 && (
              <span
                className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-medium text-white">
                {count}
              </span>
            )}
          </Link>

          {/* User menu (login / new account) */}
          <UserMenu/>
        </nav>
      </div>

      {/* Category bar (hidden on product details) */}
      {!isProductDetails && (
        <div className="mx-auto max-w-7xl px-4 pb-4">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
            <ul className="flex items-center gap-2">
              <li>
                <CategoryButton
                  label="All items"
                  value="all"
                  active={selectedCategory === 'all'}
                  onClick={() => {
                    onCategoryChange('all');
                    onSearchChange('');
                    setOnlyFavorites(false);
                    navigate('/');
                  }}
                />
              </li>
              <li>
                <CategoryButton label="Eyes" value="eyes" active={selectedCategory === 'eyes'}
                                onClick={onCategoryChange}/>
              </li>
              <li>
                <CategoryButton label="Skin" value="skin" active={selectedCategory === 'skin'}
                                onClick={onCategoryChange}/>
              </li>
              <li>
                <CategoryButton label="Lips" value="lips" active={selectedCategory === 'lips'}
                                onClick={onCategoryChange}/>
              </li>
              <li>
                <CategoryButton label="Nails" value="nails" active={selectedCategory === 'nails'}
                                onClick={onCategoryChange}/>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
