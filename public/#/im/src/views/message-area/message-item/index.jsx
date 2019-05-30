import React from 'react';
import { observer } from 'mobx-react';
import { observable, action } from "mobx";

class MessageItem extends  React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { message } = this.props;

        return(
            <div style={{border: 'solid', borderColor: 'blue', margin: '5px', padding: '3px', borderRadius: '5px'}}>
                <div style={{paddingBottom: '5px', fontStyle: 'italic'}}><b>{message.userName}  {message.userSurname} "{message.userLogin}":</b></div>
                {message.message.text}
            </div>
        )
    }
}

export default MessageItem;