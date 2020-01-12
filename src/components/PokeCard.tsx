import React from 'react';
import { Card } from 'semantic-ui-react';

const PokeCard = ({id, name, habitat, onClick}:{id:number, name:string, habitat:string, onClick: ()=>void}) => {
    let [loaded, setLoaded] = React.useState<boolean>(false)

    return(
        <Card onClick={onClick}>
            <div className="image">
                <img src="/default-image.png" style={ loaded ? {display: "none"} : {}} />
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} onLoad={()=>setLoaded(true)} style={ loaded ? {} : {display: "none"}} />
            </div>
            <Card.Content>
                <Card.Header> {name.toUpperCase()} </Card.Header>
                <Card.Meta> {habitat.toUpperCase()} </Card.Meta>
            
            </Card.Content>
        </Card>
    )
}

export default PokeCard