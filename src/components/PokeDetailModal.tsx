import React from 'react';
import { Modal, Button, Image } from 'semantic-ui-react';

const PokeDetailModal = ({id, closeModal}:{id:number,closeModal:()=>void}) =>{ 
    return (
        <Modal
            size='tiny'
            open={true}
            onClose={closeModal}
        >
            <Modal.Content>
                <Image size='small' circular src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}/>
                <p>detail goes here</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='yellow'
                    content='Close'
                    onClick={closeModal}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default PokeDetailModal