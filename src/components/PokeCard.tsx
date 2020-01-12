import React from 'react';
import { Card } from 'semantic-ui-react';

const PokeCard = ({id, name, habitat, onClick}:{id:number, name:string, habitat:string, onClick: ()=>void}) => {
    return(
        <Card
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            header={name.toUpperCase()}
            meta={habitat.toUpperCase()}
            onClick={onClick}
        />
    )
}

export default PokeCard