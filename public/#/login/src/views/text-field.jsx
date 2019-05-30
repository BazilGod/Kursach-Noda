import React from 'react';

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: props.value, holder: props.holder};
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        let val = e.target.value;
        this.setState({value: val});
    }
    render() {
        return <p>
            <label>{this.state.holder}</label> <br/>
            <input type="text" placeholder={this.state.holder} value={this.state.value} onChange={this.onChange} />
        </p>;
    }   
}  

export default TextField;