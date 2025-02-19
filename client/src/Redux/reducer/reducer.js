const initialState = {
    pokemons: [],
    types: [],
    allPokemons: [],
    detail: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            };

        case "GET_TYPES":
            return {
                ...state,
                types: action.payload,
            };

        case "FILTER_BY_TYPES":
            const allPokemons = state.allPokemons.map(e => ({
                id: e.id,
                name: e.name,
                image: e.image,
                defense: e.defense,
                attack: e.attack,
                speed: e.speed,
                types: e.type ? e.type : e.types.map(t => t.name), 
            }));

            const typesFiltered =
                action.payload === "all"
                    ? state.allPokemons
                    : allPokemons.filter(e => e.types && e.types.includes(action.payload));

            return {
                ...state,
                pokemons: typesFiltered,
            };

            case 'FILTER_CREATED':
                const filteredPoke = action.payload === "created"
                    ? state.allPokemons.filter(e => e.createdInDb) // Filtrar solo los creados
                    : state.allPokemons.filter(e => !e.createdInDb); // Filtrar los existentes en la API
            
                console.log("Pokémon filtrados:", filteredPoke);
                return {
                    ...state,
                    pokemons: filteredPoke
                };
            

        case "ORDER_BY_NAME":
            let sortedByName = [...state.pokemons].sort((a, b) => {
                return action.payload === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            });
            return {
                ...state,
                pokemons: sortedByName,
            };

        case "ORDER_BY_ATTACK":
            let sortedByAttack = [...state.pokemons].sort((a, b) => {
                return action.payload === "may" ? b.attack - a.attack : a.attack - b.attack;
            });
            return {
                ...state,
                pokemons: sortedByAttack,
            };

        case "ORDER_BY_HP":
            let sortedByHP = [...state.pokemons].sort((a, b) => {
                return action.payload === "life+" ? b.hp - a.hp : a.hp - b.hp;
            });
            return {
                ...state,
                pokemons: sortedByHP,
            };

        case "GET_NAME_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
            };

        case "CLEAN_DETAIL":
            return {
                ...state,
                detail: [],
            };

        case "GET_POKE_BY_ID":
            return {
                ...state,
                detail: action.payload,
            };

        default:
            return state;
    }
}

export default rootReducer;
