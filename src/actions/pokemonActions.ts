import axios from "axios";
import { Dispatch } from "redux";

export const fetchPokemons = (url = 'https://pokeapi.co/api/v2/pokemon-species') => (dispatch:Dispatch) => {
    return axios.get(url)
    .then(resp => {

        dispatch({
            type: 'SET_POKEMONS',
            data: resp.data.results,
        });

        dispatch({
            type:'SET_NEXT_POKEMONS',
            data: resp.data.next,
        })

        dispatch({
            type:'SET_PREV_POKEMONS',
            data: resp.data.previous,
        })

        return ({stat: true, msg: null})
    })
    .catch(err=>{
        console.log(err);
        return ({stat: false, msg: err.response.data.message})
    })
}