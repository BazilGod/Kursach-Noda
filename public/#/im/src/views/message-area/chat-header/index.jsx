import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from "mobx";
import { Button, Label } from 'react-bootstrap';
import Modal from 'react-bootstrap-modal';

import DataState from './state/data.js';

class MessageAreaHeader extends React.Component{
    constructor(props){
        super(props);

        Object.assign(this, {
            data: new DataState()
        });

        this.onHide = ::this.onHideHandler;
        this.onClickInfo = ::this.onClickInfoHandler;
        this.onAddBtnCick = ::this.onAddBtnCickHandler;
    }
    onAddBtnCickHandler(){
        const data = document.getElementById("new-user-login").value;
        if(data.length > 0) {
            this.data.onAddUserToChat(data, this.props.userId, this.props.chat.id);
        }
        else
            alert('input user login');
    }
    onClickInfoHandler(){
        const data = document.getElementById("new-user-login").value;
        if(data.length > 0) {
            this.data.setIsLoaded(false);
            this.data.fetchUserInfo(data);
            this.data.setIsHide(true);
        }
        else
            alert('input user login');
    }

    onHideHandler(){
        this.data.setIsHide(false);
    }

    render(){
        const { chat } = this.props;
        const { isHide, isLoaded, user } = this.data;

        return (
            <div style={{width:'100%', height:'12%', borderColor:'blue', borderStyle: 'solid'}} >
                <div  style={{width: '100%', borderBottom: 'solid blue', paddingLeft: '5px'}}>{chat.name}</div>
                <div>
                    <input id="new-user-login" type="text" placeholder="user login" style={{height: '30px', width: '40%', float: 'left', marginTop: '5px'}}/>
                    <Button onClick={this.onAddBtnCick} bsStyle="primary" style={{height: '30px', marginLeft: '5px', marginTop: '5px'}}>add to chat</Button>
                    <Button onClick={this.onClickInfo} bsStyle="primary" style={{height: '30px', marginLeft: '5px', marginTop: '5px'}}>get info</Button>
                </div>
                <Modal show={isHide} onHide={this.onHide}>
                    <Modal.Header>
                        <Modal.Title id='ModalHeader'>
                            {isLoaded && <div>Login: {user.login}</div>}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            !isLoaded ?
                                <div>Loading....</div> :
                                <div>
                                    <h2>Name: </h2><h4>{user.name}</h4>
                                    <h2>Surname: </h2><h4>{user.surname}</h4>
                                </div>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default observer(MessageAreaHeader);