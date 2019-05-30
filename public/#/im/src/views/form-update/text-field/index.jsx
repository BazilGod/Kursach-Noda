import React from 'react';
import ReactDOM from 'react-dom';

export default class TextField extends React.Component {
    constructor(props) {
        super(props);
        let isValid = this.validate(props.value);
        this.state = {value: props.value, holder: props.holder, valid: isValid};
        this.onChange = this.onChange.bind(this);
    }
    validate(val){
        if(!val)
            return false;
        let expression = new RegExp(/(^)[a-zA-Z]+($)/);
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
            <label>{this.state.holder}</label> <br/>
            <input type="text" placeholder={this.state.holder} value={this.state.value} onChange={this.onChange} style={{borderColor:color}} />
        </p>;
    }
}