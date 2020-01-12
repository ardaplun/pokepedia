import { Reducer } from 'redux'

export interface PokemonStateType{
    pokemons: undefined | Array<any>
    pokemon: undefined | Array<any>
    pokemonHabitats: undefined | Array<any>
    pokemonSpecies: undefined | Array<any>
    pokemonShapes: undefined | Array<any>
    nextUrl: string
    prevUrl: string
}

const initialState:PokemonStateType = {
    pokemons: undefined,
    pokemon: undefined,
    pokemonHabitats: undefined,
    pokemonSpecies: undefined,
    pokemonShapes: undefined,
    nextUrl: '',
    prevUrl:''
}


const pokemonReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POKEMONS':
            return { ...state, pokemons: action.data }
        case 'SET_POKEMON':
            return { ...state, pokemon: action.data }
        case 'SET_NEXT_POKEMONS':
            return { ...state, nextUrl: action.data }
        case 'SET_PREV_POKEMONS':
            return { ...state, prevUrl: action.data }
        default:
            return state
    }
}
  
export default pokemonReducer