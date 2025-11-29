import {useEffect} from "react";
import {useFavorites} from "../context/FavoriteContext";
import Home from "./Home";
import {type Category} from "../types/category";

interface FavoritesPageProps {
  selectedCategory: Category;
  searchQuery: string;
  onCategoryChange: (c: Category) => void;
  onSearchChange: (q: string) => void;
}

export default function FavoritesPage({
                                        selectedCategory,
                                        searchQuery,
                                        onCategoryChange,
                                        onSearchChange
                                      }: FavoritesPageProps) {

  const {setOnlyFavorites} = useFavorites();

  useEffect(() => {
    // When entering the favorites page:
    setOnlyFavorites(true);
    onCategoryChange("all");
    onSearchChange("");
  }, []);

  return (
    <Home
      selectedCategory={selectedCategory}
      searchQuery={searchQuery}
    />
  );
}
