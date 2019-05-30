import React from 'react';
import { observer, toJS } from 'mobx-react';


class ChatItem extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = ::this.onClickHandler;
    }

    onClickHandler(){
        this.props.onClick(this.props.chat);
    }

    render() {
        const { chat } = this.props;

        return (
            <div className="chat-item card" onClick={this.onClick} style={{borderRadius: '7px', borderColor:'blue', borderStyle: 'solid', margin: '5px', height: '30px', textAlign: 'center'}}>
                <b>{chat.name}</b>
            </div>
        );
    }
}

export default ChatItem;

