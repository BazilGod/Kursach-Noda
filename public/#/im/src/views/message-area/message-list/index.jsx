import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from "mobx";

import MessageItem from '../message-item/index.jsx';

class MessageList extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const { messages } = this.props;

        return (
            <div style={{width:'100%', height:'81%', borderColor:'blue', borderStyle: 'solid', overflowY: 'auto'}} >
                {messages.map(message => <MessageItem message={message}/>)}

            </div>
        )
    }
}

export default observer(MessageList);