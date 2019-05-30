import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from "mobx";

import DataStore from './state/data.js';
import Header from './chat-header/index.jsx';
import MessageList from './message-list/index.jsx';
import ChatFooter from './chat-footer/index.jsx';

class MessageArea extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const { isLoaded, messages } = this.props;
        const { userId, chat, update } = this.props;

        return (
            <div style={{float:'left', width:'70%', height:'93%', borderColor:'blue', borderStyle: 'solid'}} >
                {
                    !isLoaded ?
                        <div  style={{marginTop: '45%', marginLeft: '45%'}}>Loading......</div> :
                        <div>
                            <Header chat={chat} userId={userId}/>
                            <MessageList messages={messages}/>
                            <ChatFooter chat={chat} userId={userId} update={update}/>
                        </div>
                }
            </div>
        )
    }
}

export default observer(MessageArea);