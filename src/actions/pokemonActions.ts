import axios from "axios";
import { Dispatch } from "redux";

export const fetchPokemons = (url = 'https://pokeapi.co/api/v2/pokemon-species') => (dispatch:Dispatch) => {
    return axios.get(url)
    .then(resp => {
        console.log({url,resp});
        
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

        return ({resp: true, msg: null})
    })
    .catch(err=>{
        console.log(err);
        return ({resp: false, msg: err.response.data.message})
    })
}