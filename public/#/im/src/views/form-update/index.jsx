import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import TextField from './text-field/index.jsx';
import PasswordField from './password-field/index.jsx';
import RepeatingPasswordField from './repeating-password-field/index.jsx';

export default class FormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value, name: props.userName};

        this.getFormUpdatePass = ::this.getFormUpdatePass;
        this.getFormUpdate = ::this.getFormUpdate;
        this.onInfoUpdate = ::this.onInfoUpdateHandler;
        this.onPassUpdate = ::this.onPassUpdateHandler;
    }

    getFormUpdate(){
        return {
            name: this.refs.nameField.state.value,
            surname: this.refs.surnameField.state.value,
        }
    }

    getFormUpdatePass(){
        return {
            password: this.refs.pass.state.value
        }
    }

    onInfoUpdateHandler(){
        if(this.refs.nameField.state.valid && this.refs.surnameField.state.valid){
            const data = this.getFormUpdate();
            axios.put(`http://localhost:3000/api/v1/users/${this.state.name}`, data)
                .then(result => alert('Successfully updated'));
        }
        else
            alert('input correct data');
    }

    onPassUpdateHandler(){
        if(this.refs.pass.state.valid && this.refs.pass2.state.valid &&
            this.refs.pass.state.valid === this.refs.pass2.state.valid){
            const data = this.getFormUpdatePass();
            axios.put(`http://localhost:3000/api/v1/users/${this.state.name}`, data)
                .then(result => alert('Successfully updated'));
        }
        else
            alert('input correct data');
    }

    render() {
        return (
            <form>
                <TextField ref="nameField" holder="Name" />
                <TextField ref="surnameField" holder="Surname"/>
                <Button bsStyle="info" onClick={this.onInfoUpdate}>Update info</Button>
                <PasswordField ref="pass"/>
                <RepeatingPasswordField ref="pass2"/>
                <Button bsStyle="info" onClick={this.onPassUpdate}>Update password</Button>
            </form>
        );
    }
}