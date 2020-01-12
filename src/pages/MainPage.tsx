import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Container, Grid, Button, Icon } from 'semantic-ui-react';
import { PokemonStateType } from '../reducers/pokemonReducer';
import { fetchPokemons } from '../actions';
import Loading from '../components/Loading';
import PokeCard from '../components/PokeCard';
import PokeDetailModal from '../components/PokeDetailModal';

interface MainPageProps{
    pokemons: undefined | Array<any>,
    nextUrl: string
    prevUrl: string
    fetchPokemons: (url:string)=>Promise<any>
}

const MainPage: React.FC<MainPageProps> = ({pokemons, nextUrl, prevUrl, fetchPokemons}) => {
    let [selectedPokemon, setSelectedPokemon] = React.useState<number>(0)
    let [processing, setProcessing] = React.useState<boolean>(false)

    React.useEffect(()=>{
        setProcessing(true)
        fetchPokemons('https://pokeapi.co/api/v2/pokemon-species').then(resp=>{
            if(!resp.stat) alert(resp.msg)
            setProcessing(false)
        })
    },[fetchPokemons])

    const changePageHandler = (url:string) => {
        setProcessing(true)
        fetchPokemons(url).then(resp=>{
            if(!resp.stat) alert(resp.msg)
            setProcessing(false)
        })
    }

    console.log({pokemons, nextUrl, prevUrl});
    if(!pokemons) return <Loading/>

    let pokemonList = pokemons.map((pokemon)=>{
        let idPokemon = pokemon.url.split('/')[6]
        return (<Grid.Column key={idPokemon} mobile={1} tablet={5} computer={3}><PokeCard id={Number(idPokemon)} name={pokemon.name} onClick={()=>setSelectedPokemon(Number(idPokemon))} /></Grid.Column>)
    })

    return (
        <Container style={{marginTop:'2em',marginBottom:'2em'}}>
            {processing && <Loading/>}
            <Header size='huge'>POKEPEDIA</Header>
            <Divider/>
            <Grid centered stackable columns={5}>{pokemonList}</Grid>
            {selectedPokemon > 0 && <PokeDetailModal id={selectedPokemon} closeModal={()=>setSelectedPokemon(0)} />}
            <Container style={{marginTop:'2em'}}>
                <Button onClick={()=>changePageHandler(prevUrl)} disabled={!prevUrl} basic color='red' processing={processing}> <Icon name='chevron left'/> Prev </Button>
                <Button onClick={()=>changePageHandler(nextUrl)} disabled={!nextUrl} basic color='red' style={{float:'right'}} processing={processing}> Next <Icon name='chevron right'/> </Button>
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
