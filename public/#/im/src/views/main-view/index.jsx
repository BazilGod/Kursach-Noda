import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from "mobx";
import { Button } from 'react-bootstrap';

import Header from './../header/index.jsx';
import ChatList from './../chat-list/index.jsx';
import MessageArea from '../message-area/index.jsx';
import EmptyMessageArea from '.././empty-message-area/index.jsx';
import DataStore from './data/index.js';

class View extends React.Component {
    constructor(props) {
        super(props);

        Object.assign(this, {
            data: new DataStore()
        });

        this.onChatItemClick = ::this.onChatItemClickHandler;
    }

    onChatItemClickHandler(chat){
        this.data.setIsLoaded(false);
        this.data.setChat(chat);
        this.data.setIsChoosed(true);
        this.data.fetchMessages();
    }

    render() {
        const { name, userId, isChoosed, chat, isLoaded, messages } =  this.data;
        const values = {
            userName: name
        };

        return <div style={{marginLeft:'15%', height:'99%', width:'70%', borderColor:'blue', borderStyle: 'solid', borderRadius:'8px'}} >
            <Header values={values}/>
            <ChatList userId={userId} onChatItemClick={this.onChatItemClick}/>
            {
                !isChoosed ?
                <EmptyMessageArea/> :
                <MessageArea chat={chat} userId={userId} isLoaded={isLoaded} messages={messages} update={this.onChatItemClick}/>
            }
            </div>
    }
}

export default observer(View);