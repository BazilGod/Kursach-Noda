import React from 'react';
import axios from 'axios';

import TextField from './text-field.jsx';
import PasswordField from './password-field.jsx';
import RedirectButton from './redirect-button.jsx';    

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};                    
        this.handleAuth = this.handleAuth.bind(this);
        this.getForm = this.getForm.bind(this);
    }
    getForm(){
        return {
            login: this.refs.login.state.value,
            password: this.refs.pass.state.value
        }
    }
    handleAuth(event) {
    event.preventDefault()
        let val = this.getForm();
        axios.post('https://app-kursach.herokuapp.com/login', val)
            .then((response) => {
                window.location = `https://app-kursach.herokuapp.com/main/im?login=${val.login}&id=${response.data.userId}`;
            })
            .catch((error) => {
                alert('error credentials');
            })
    }

    render() {
        return (
            <div style={{textAlign: 'center', marginTop: '10%'}}>
            <form>
                <TextField value="" ref="login" holder="Login"/>
                <PasswordField value="" ref="pass"/>
                <input type="button" onClick={this.handleAuth} value="LOG IN" />                
            </form>
            <RedirectButton/>
            <a href='https://app-kursach.herokuapp.com/help'>api</a>
            </div>
        );
    }
}

export default LoginForm;