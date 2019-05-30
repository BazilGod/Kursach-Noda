import React from 'react';

class EmptyMessageArea extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div style={{float:'left', width:'70%', height:'93%', borderColor:'blue', borderStyle: 'solid'}} >
            <div style={{marginTop: '45%', marginLeft: '45%'}}><b>Choose the chat</b></div>
        </div>
    }
}

export default EmptyMessageArea;