import axios from "axios";


export function getPokemons() {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/pokemons");
            dispatch({
                type: "GET_POKEMONS",
                payload: json.data,
            });
        } catch (error) {
            console.error("❌ Error obteniendo Pokemon:", error);
        }
    };
}


export function getTypes() {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/types");
            dispatch({
                type: "GET_TYPES",
                payload: json.data,
            });
        } catch (error) {
            console.error("❌ Error obteniendo tipos:", error);
        }
    };
}


export function filterPokemonsByTypes(payload) {
    return {
        type: "FILTER_BY_TYPES",
        payload,
    };
}


export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload,
    };
}

export function getNamePokemons(name) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            dispatch({
                type: "GET_NAME_POKEMONS",
                payload: json.data,
            });
        } catch (error) {
            console.error("❌ Error buscando Pokemon por nombre:", error);
        }
    };
}


export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload,
    };
}


export function orderByAttack(payload) {
    return {
        type: "ORDER_BY_ATTACK",
        payload,
    };
}


export function postPokemons(payload) {
    return async function () {
        try {
            const response = await axios.post("http://localhost:3001/pokemons", payload);
            console.log("✅ Pokemon creado con exito:", response.data);
            return response;
        } catch (error) {
            console.error("❌ Error creando Pokemon:", error);
        }
    };
}

export function cleanDetail() {
    return {
        type: "CLEAN_DETAIL",
    };
}


export function getPokeByParams(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/pokemons/${id}`);
            dispatch({
                type: "GET_POKE_BY_ID",
                payload: json.data,
            });
        } catch (error) {
            console.error("❌ Error obteniendo detalles del Pokemon:", error);
        }
    };
}


export function orderByHp(payload) {
    return {
        type: "ORDER_BY_HP",
        payload,
    };
}
