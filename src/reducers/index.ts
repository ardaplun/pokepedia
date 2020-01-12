import { combineReducers } from "redux";

import PokemonReducer from "./pokemonReducer";

const reducers = {
    pokeStore: PokemonReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
