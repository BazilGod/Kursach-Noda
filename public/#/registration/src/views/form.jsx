import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import TextField from './text-field.jsx';
import PasswordField from './password-field.jsx';
import RepeatingPasswordField from './repeating-password-field.jsx';

export default class FormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};                    
        this.handleRegistrate = this.handleRegistrate.bind(this);
        this.validate = this.validate.bind(this);
        this.getForm = this.getForm.bind(this);
    }
    getForm(){
        return {
            name: this.refs.nameField.state.value,
            surname: this.refs.surnameField.state.value,
            login: this.refs.login.state.value,
            password: this.refs.pass.state.value
        }
    }

    handleRegistrate() {
        if(this.validate())
            alert('non corect data')
        else{
            let val = this.getForm();
            axios.post('http://localhost:3000/registration', val)
                .then(res => {
                    alert('ok')
                    window.location= 'http://localhost:3000/login';
                })
                .catch(err => {
                    alert('this login is used');
                })
        }
    }

    validate(){
        if(this.refs.nameField.state.valid && this.refs.surnameField.state.valid &&
           this.refs.login.state.valid && 
           this.refs.pass.state.valid && this.refs.pass2.state.valid)
            return false;
        else
            return true;
    }

    render() {
        return (
            <div style={{textAlign: 'center', marginTop: '10%'}}>
                <form>
                    <TextField ref="nameField" holder="Name"/>
                    <TextField ref="surnameField" holder="Surname"/>
                    <TextField ref="login" holder="Login"/>
                    <PasswordField ref="pass"/>
                    <RepeatingPasswordField ref="pass2"/>
                    <input type="button" onClick={this.handleRegistrate} value="registrate" />
                </form>
            </div>
        );
    }
}