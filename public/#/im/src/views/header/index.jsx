import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';
import axios from 'axios';

import DataState from './state/data.js';
import FormUpdate from '../form-update/index.jsx';

class Header extends React.Component{
    constructor(props){
        super(props);

        Object.assign(this, {
            data: new DataState()
        });

        this.onHide = ::this.onHideHandler;
        this.onClick = ::this.onClickHandler;
        this.onLogOut = ::this.onLogOutHandler;
    }

    onLogOutHandler(){
        axios.post('http://localhost:3000/logout')
            .then(() => document.location = "http://localhost:3000/login")
    }

    onClickHandler(){
        this.data.setIsHide(true);
    }

    onHideHandler(){
        this.data.setIsHide(false);
    }

    render(){
        const name = this.props.values.userName;
        const { isHide } = this.data;

        return (
            <div style={{height:'7%', borderColor:'blue', borderStyle: 'solid', backgroundColor: 'blue'}} >
                <div style={{marginTop: '1%', marginLeft: '2%', float: 'left'}}>
                    <b style={{color: 'white'}}>
                        MESSENGER
                    </b>
                </div>
                <div style={{float: 'right', width: '30%', height: '100%'}}>
                    <Button onClick={this.onClick} style={{width: '100%', height: '100%'}} bsStyle="primary">{name}</Button>
                </div>
                <div>
                <Modal
                    show={isHide}
                    onHide={this.onHide}>
                    <Modal.Header>
                        <Modal.Title id='ModalHeader'>{name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormUpdate userName={name}/>
                    </Modal.Body>
                    <Button onClick={this.onLogOut} bsStyle="danger">LOG OUT</Button>
                </Modal>
                </div>
            </div>
        )
    }
} 

export default observer(Header);