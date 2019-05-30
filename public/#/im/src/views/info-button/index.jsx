import React from 'react';

class InfoButton extends React.Component{
    constructor(props){
        super(props);

        this.onClick = ::this.onClickHandler;
    }

    onClickHandler(){
        alert('user info');
    }

    render(){
        const userName = this.props.value;

        return <div style={{marginRight:'8%',borderColor:'red', height:'', width: '15%', float: 'right'}}>
            <button onClick={this.onClickHandler} style={{width: '150%', height:'100%'}}>{userName}</button>
        </div>;
    }
}

export default InfoButton;