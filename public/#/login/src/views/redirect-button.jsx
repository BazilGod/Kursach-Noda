import React from 'react';

class RedirectButton extends React.Component{
    constructor(props){
        super(props);

        this.onClick = ::this.onClickHandler;
    }

    onClickHandler(){
        document.location = 'https://app-kursach.herokuapp.com/registration';
    }

    render(){
        return <div>
            <input onClick={this.onClick} type="button" value="registration"/>
        </div>
    }
}

export default RedirectButton;