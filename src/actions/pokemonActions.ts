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

export const fetchHabitats = () => (dispatch:Dispatch) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-habitat`)
    .then(resp => {

        let allHabitatsAPI = resp.data.results.map(({url}:{url:string})=>axios.get(url).then(resp=>resp.data))

        return axios.all(allHabitatsAPI)
        .then(axios.spread((...args) => {
            let result: any[] =[]
            args.forEach(x=>{result = result.concat(x)})

            dispatch({
                type:'SET_POKEMONS_HABITATS',
                data: result,
            })
            
            return ({stat: true, msg: null})
        }))
    })
    .catch(err=>{
        console.log(err);
        return ({stat: false, msg: err.response.data.message})
    })
}

export const fetchPokemonDetail = (url:string) => (dispatch:Dispatch) => {
    return axios.get(url)
    .then(resp => {
        
        dispatch({
            type:'SET_POKEMON',
            data: resp.data,
        })

        return ({stat: true, msg: resp.data})
    })
    .catch(err=>{
        console.log(err);
        return ({stat: false, msg: err.response.data.message})
    })
}

