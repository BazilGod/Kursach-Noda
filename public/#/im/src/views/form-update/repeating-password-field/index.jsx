import React from 'react';
import ReactDOM from 'react-dom';

export default class RepeatingPasswordField extends React.Component {
    constructor(props) {
        super(props);
        var isValid = false;
        this.state = {value: props.value, valid: isValid, password: ''};
        this.onChange = this.onChange.bind(this);
    }
    validate(val){
        let passField = document.getElementById("passField");
        return val === passField.value ? true : false;
    }
    onChange(e) {
        let val = e.target.value;
        let isValid = this.validate(val);
        this.setState({value: val, valid: isValid});
    }
    render() {
        let color = this.state.valid===true?"green":"red";
        return <p>
            <label>Repeat password</label><br/>
            <input type="password" placeholder="repeat password" value={this.state.value} onChange={this.onChange} style={{borderColor:color}} />
        </p>;
    }
}