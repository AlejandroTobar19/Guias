export const createFavoritesSlice = (set, get) => ({
    // Estado inicial: una lista vacía de favoritos
    favorites: [],

    // Función para verificar si una receta ya está en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink == id);
    },

    // Maneja el clic en el botón de favorito (agregar o eliminar)
    handleClickFavorite: (recipe) => {

        const { showNotification } = get();

        if (get().favoriteExists(recipe.idDrink)) {
            // Si la receta ya está en favoritos, la eliminamos de la lista
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink != recipe.idDrink)
            }));
            showNotification('Receta eliminada de favoritos', 'error');
        } else {
            // Si no está en favoritos, la agregamos
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }));
            showNotification('Receta agregada a favoritos', 'success');
        }

        // Guardamos la lista actualizada de favoritos en localStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },

    // Carga la lista de favoritos desde localStorage al iniciar la aplicación
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            });
        }
    }
});
