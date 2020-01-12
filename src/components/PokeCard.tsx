import React from 'react';
import { Card } from 'semantic-ui-react';
import { pascalCaseWord } from '../commons';

const PokeCard = ({id, name, habitat, onClick}:{id:number, name:string, habitat:string, onClick: ()=>void}) => {
    let [loaded, setLoaded] = React.useState<boolean>(false)

    return(
        <Card onClick={onClick}>
            <div className="image">
                <img src="/default-image.png" style={ loaded ? {display: "none"} : {}} alt='default loaded' />
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`${name}`} onLoad={()=>setLoaded(true)} style={ loaded ? {} : {display: "none"}} />
            </div>
            <Card.Content>
                <Card.Header> {name.toUpperCase()} </Card.Header>
                <Card.Meta> {pascalCaseWord(habitat)} </Card.Meta>
            
            </Card.Content>
        </Card>
    )
}

export default PokeCard