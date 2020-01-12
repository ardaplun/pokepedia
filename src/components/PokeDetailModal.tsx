import React from 'react';
import { Modal, Button, Image, Grid } from 'semantic-ui-react';
import { PokemonStateType } from '../reducers/pokemonReducer';
import { connect } from 'react-redux';
import { fetchPokemonDetail } from '../actions';
import Loading from './Loading';
import { pascalCaseWord } from '../commons';


const PokemonDescriptionItem = ({title, description}:{title:string, description:string})=>{
    return(<Grid.Column>
            <span>{title}</span>
            <p><b>{description}</b></p>
        </Grid.Column>
    )
}

interface PokeDetailModalProps {
    id:number
    closeModal:()=>void
    pokemon:any
    fetchPokemonDetail:(url:string)=>Promise<any>
}

const PokeDetailModal = ({id, closeModal, pokemon, fetchPokemonDetail}:PokeDetailModalProps) =>{ 
    let [processing, setProcessing] = React.useState<boolean>(false)
    let [pokemonStat, setPokemonStat] = React.useState({height:0, weight:0, habitat:'', shape:'', color:'', desc:''})

    React.useEffect(()=>{
        setProcessing(true)
        fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resp=>{
            if(!resp.stat) alert(resp.msg)
            setPokemonStat(prev=>({...prev, height:resp.msg.height, weight:resp.msg.weight}))
            fetchPokemonDetail(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(resp=>{
                if(!resp.stat) alert(resp.msg)
                let desc = resp.msg.flavor_text_entries.find((dt: { language: { name: string; }; })=>dt.language.name==='en')
                setPokemonStat(prev=>({...prev, habitat:resp.msg.habitat.name, shape:resp.msg.shape.name, color:resp.msg.color.name, desc:desc.flavor_text}))
                setProcessing(false)
            })
        })
    },[fetchPokemonDetail, id])

    if(!pokemon) return<Loading/>

    return (
        <Modal
            size='tiny'
            open={true}
            onClose={closeModal}
        >
            {processing && <Loading/>}
            <Modal.Content>
                <Image 
                    size='small' 
                    circular 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    style={{marginLeft:'auto', marginRight:'auto', border:'1px solid lightgrey'}}
                />
            </Modal.Content>
            <Modal.Actions style={{background:'#eee'}}>
                <Grid columns='equal' textAlign='left'>
                    <Grid.Row>
                        <Grid.Column>
                            <PokemonDescriptionItem title='Description' description={pokemonStat.desc}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <PokemonDescriptionItem title='Color' description={pascalCaseWord(pokemonStat.color)}/>
                        </Grid.Column>
                        <Grid.Column>
                            <PokemonDescriptionItem title='Shape' description={pascalCaseWord(pokemonStat.shape)}/>
                        </Grid.Column>
                        <Grid.Column>
                            <PokemonDescriptionItem title='Weight' description={pokemonStat.weight+'kg'}/>
                        </Grid.Column>
                        <Grid.Column>
                            <PokemonDescriptionItem title='Height' description={pokemonStat.height+'cm'}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Column>
                        <PokemonDescriptionItem title='Habitat' description={pascalCaseWord(pokemonStat.habitat)}/>
                    </Grid.Column>
                </Grid>
                <Button
                    color='yellow'
                    content='Close'
                    onClick={closeModal}
                />
            </Modal.Actions>
        </Modal>
    )
}

const mapStateToProps = ({pokeStore}:{pokeStore:PokemonStateType}) => ({
    pokemon: pokeStore.pokemon,
});

const mapDispatchToProps = {
    fetchPokemonDetail
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PokeDetailModal); 