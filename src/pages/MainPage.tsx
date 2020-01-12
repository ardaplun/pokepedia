import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Container, Grid, Button } from 'semantic-ui-react';
import { PokemonStateType } from '../reducers/pokemonReducer';
import { fetchPokemons } from '../actions';
import Loading from '../components/Loading';
import PokeCard from '../components/PokeCard';
import PokeDetailModal from '../components/PokeDetailModal';

interface MainPageProps{
    pokemons: undefined | Array<any>,
    nextUrl: string
    prevUrl: string
    fetchPokemons: (url:string)=>void
}

const MainPage: React.FC<MainPageProps> = ({pokemons, nextUrl, prevUrl, fetchPokemons}) => {
    let [selectedPokemon, setSelectedPokemon] = React.useState<number>(0)

    React.useEffect(()=>{
        fetchPokemons('https://pokeapi.co/api/v2/pokemon-species')
    },[fetchPokemons])

    console.log({pokemons, nextUrl, prevUrl});
    if(!pokemons) return <Loading/>

    let pokemonList = pokemons.map((pokemon,i)=>{
        let idPokemon = pokemon.url.split('/')[6]
        return (<Grid.Column key={i}><PokeCard id={Number(idPokemon)} name={pokemon.name} onClick={()=>setSelectedPokemon(Number(idPokemon))} /></Grid.Column>)
    })

    return (
        <Container style={{marginTop:'2em',marginBottom:'2em'}}>
            <Header size='huge'>POKEPEDIA</Header>
            <Divider/>
            <Grid stackable columns={5}>{pokemonList}</Grid>
            {selectedPokemon > 0 && <PokeDetailModal id={selectedPokemon} closeModal={()=>setSelectedPokemon(0)} />}
            <Container>
                <Button onClick={()=>fetchPokemons(nextUrl)}>Next</Button>
            </Container>
        </Container>
    );
}


const mapStateToProps = ({pokeStore}:{pokeStore:PokemonStateType}) => ({
    pokemons: pokeStore.pokemons,
    nextUrl: pokeStore.nextUrl, 
    prevUrl: pokeStore.prevUrl
});

const mapDispatchToProps = {
    fetchPokemons
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage); 
