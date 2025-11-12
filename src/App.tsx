// import React from "react";
import Login from "./pages/Login.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Favorite, {useFavorites} from "./components/Favorite.tsx";

function HeaderFavoritesButton() {
    const {showOnlyFavorites, toggleFilter, ids} = useFavorites();
    const count = ids.size;
    return (

        <button
            type="button"
            aria-label="Favorites"
            aria-pressed={showOnlyFavorites}
            onClick={toggleFilter}
            title={showOnlyFavorites ? "Showing only favorites" : "Show only favorites"}
            className={`relative ml-auto flex items-center justify-center rounded-full border px-3 py-2 text-sm hover:bg-gray-50 ${showOnlyFavorites ? "border-rose-400 bg-rose-50" : "border-gray-300 bg-white"}`}
            data-has-favorites={count > 0 ? true : undefined}
        >
            {/* Heart icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className={`h-5 w-5 ${showOnlyFavorites ? "text-rose-600" : "text-rose-500"}`}>
                <path
                    d="M11.645 20.91l-.007-.003-.022-.012a21.86 21.86 0 0 1-1.162-.682 25.18 25.18 0 0 1-4.063-3.02C3.454 14.584 1.5 12.272 1.5 9.75A5.25 5.25 0 0 1 6.75 4.5a5.22 5.22 0 0 1 3.75 1.59A5.22 5.22 0 0 1 14.25 4.5 5.25 5.25 0 0 1 19.5 9.75c0 2.523-1.955 4.834-4.891 7.444a25.18 25.18 0 0 1-4.063 3.02 21.86 21.86 0 0 1-1.162.682l-.022.012-.007.003-.003.002a.75.75 0 0 1-.682 0l-.003-.002Z"/>
            </svg>
            {/* Badge with count */}
            {count > 0 && (
                <span
                    className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-medium text-white">
                  {count}
                </span>
            )}
        </button>
    );
}

function App() {
    return (
        <Favorite>
            <div className="min-h-screen bg-gray-50 text-gray-900">

                {/* Header */}
                <header className="border-b bg-pink-200">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">

                        {/* Nome da loja */}
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight">Online Shop Kel</span>
                        </div>

                        {/* Busca (ainda preciso fazer a função, apenas  estático) */}
                        <div className="flex-1 max-w-xl">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                {/* aqui tenho o ícone de lupa simples */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd"
                        d="M10 3.75a6.25 6.25 0 1 0 3.9 11.2l4.55 4.55a.75.75 0 1 0 1.06-1.06l-4.55-4.55A6.25 6.25 0 0 0 10 3.75Zm-4.75 6.25a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0Z"
                        clipRule="evenodd"/>
                </svg>
              </span>
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 text-sm outline-none focus:border-gray-400 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Aqui tenho as ações (favoritos, conta, login, carrinho) */}
                        <nav className="flex items-center gap-4">

                            {/* Favoritos: agora controla o filtro de exibição */}
                            <HeaderFavoritesButton/>


                            {/* Carrinho ícone*/}
                            <button
                                type="button"
                                className="flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="h-5 w-5">
                                    <path
                                        d="M2.25 3a.75.75 0 0 0 0 1.5h1.386l.955 9.549A2.25 2.25 0 0 0 6.83 16.125h8.79a2.25 2.25 0 0 0 2.238-2.076l.66-7.425A.75.75 0 0 0 17.775 6H5.99l-.13-1.3A1.5 1.5 0 0 0 4.636 3H2.25Zm5.25 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9-1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                </svg>
                            </button>

                            {/* importando o login icone */}
                            <Login/>

                        </nav>
                    </div>

                    {/* Aqui tenho todos os produtos e tbm por categoria*/}
                    <div className="mx-auto max-w-7xl px-4 pb-4">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">

                            <ul className="flex items-center gap-2">

                                <li>
                                    <button className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">All items
                                    </button>
                                </li>

                                <li>
                                    <button className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">Hair
                                    </button>
                                </li>

                                <li>
                                    <button className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">Skin
                                    </button>
                                </li>

                                <li>
                                    <button className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200">Nails
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>

                </header>

                {/* Conteúdo: grade de produtos */}
                <Home/>

                {/* importando o rodapé simples */}
                <Footer/>

            </div>
        </Favorite>
    );
}

export default App;
