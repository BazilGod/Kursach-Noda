import React from 'react';
import { observer, toJS } from 'mobx-react';
import { Button } from 'react-bootstrap'

import DataStore from './state/data.js';
import ChatItem from './chat-item/index.jsx';

class ChatList extends React.Component {
    constructor(props) {
        super(props);

        Object.assign(this, {
            data: new DataStore(props.userId)
        });

        this.onClick = ::this.onClickHandler;
        this.onChatItemClick = ::this.onChatItemClickHandler;

        this.data.fetchChats();
    }

    onChatItemClickHandler(chat){
        this.props.onChatItemClick(chat);
    }

    onClickHandler(){
        const newChatName = document.getElementById('new-chat-name').value;
        this.data.addChat(newChatName);
        document.getElementById('new-chat-name').value = '';
    }

    render() {
        const { isLoaded, chats } = this.data;

        return   (
        <div style={{float:'left', height:'93%', width:'30%', borderColor:'blue', borderStyle: 'solid'}} >
            <input id="new-chat-name" type="text" placeholder="new chat name" style={{width: '74%', height: '30px', float: 'left'}}/>
            <Button bsStyle="primary" onClick={this.onClick} style={{width: '25%', height: '30px'}}>create</Button>
            {
                !isLoaded ?
                    <div style={{marginTop: '40%', marginLeft: '40%'}}>Loading......</div> :
                    <div style={{height: '95%', overflowY: 'auto'}}>
                        {chats.map(chat => <ChatItem onClick={this.onChatItemClick} key={chat.id} chat={chat}/>)}
                    </div>
            }
        </div>
        )
    }
}

export default observer(ChatList);

