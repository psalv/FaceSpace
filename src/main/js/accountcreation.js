import React from 'react';

var NewNameBox = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            name : "",
            success : ""
        }
    },

    // Event handler for text change
    handleChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value });
    },

    // Event handler for button clicked / enter typed
    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.name;
        fetch('http://localhost:8080/AccountCreation/createAccount?userName=' + name, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'Account created!'});
            }
            else{
                this.setState({success: 'Sorry, that name is taken.'});
            }
        })
    },

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Create An Account" />
                </form>
                <br/>
                Success : {this.state.success}
            </div>

        );
    }
});

export class AccountCreation extends React.Component{
    render(){
        return(
            <div>
                Create an account with your name:<br/>
                <NewNameBox callback={this.setNameState}/>
                <br/>
            </div>
        );
    }
}