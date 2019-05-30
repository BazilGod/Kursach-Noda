import React from 'react';

class PasswordField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value};
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        let val = e.target.value;
        this.setState({value: val});
    }
    render() {
        return <p>
            <label>Password</label><br/>
            <input type="password" placeholder="password" onChange={this.onChange} value={this.state.value}/>
        </p>;
    }  
}  

export default PasswordField;