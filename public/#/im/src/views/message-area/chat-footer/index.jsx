import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from "mobx";
import { Button } from 'react-bootstrap';
import axios from 'axios';

class ChatFooter extends React.Component{
    constructor(props){
        super(props);

        this.onClick = ::this.onClickHandler;
        this.onCompleteSend = ::this.onCompleteSendHandler;
    }

    onCompleteSendHandler(){
        this.props.update(this.props.chat);
    }

    onClickHandler(){
        const text = document.getElementById("message-text").value;
        axios.post(`http://localhost:3000/api/v1/users/${this.props.userId}/chats/${this.props.chat.id}/messages`,{text:text})
            .then(this.onCompleteSend);
    }

    render(){
        return (
            <div style={{width:'100%', height:'7%', borderColor:'blue', borderStyle: 'solid'}} >
                <div>
                    <input id="message-text" type="text" placeholder="MESSAGE" style={{height: '100%', width: '78%', float: 'left'}}/>
                    <Button onClick={this.onClick} bsStyle="primary" style={{height: '100%', width: '22%'}}>SEND MESSAGE</Button>
                </div>
            </div>
        )
    }
}

export default observer(ChatFooter);