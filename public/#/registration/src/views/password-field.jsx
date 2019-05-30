import React from 'react';
import ReactDOM from 'react-dom';

export default class PasswordField extends React.Component {
    constructor(props) {
        super(props);
        let isValid = this.validate(props.value);
        this.state = {value: props.value, valid: isValid};
        this.onChange = this.onChange.bind(this);
    }
    validate(val){
        let expression = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/);
        return expression.test(val);                    
    }
    onChange(e) {
        let val = e.target.value;
        let isValid = this.validate(val);
        this.setState({value: val, valid: isValid});
    }
    render() {
        let color = this.state.valid===true?"green":"red";
        return <p>
            <label>Password</label><br/>
            <input type="password" placeholder="password" id="passField" value={this.state.value} onChange={this.onChange} style={{borderColor:color}} />
        </p>;
    }  
}