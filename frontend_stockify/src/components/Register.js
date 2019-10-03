import React from 'react'
import { withRouter } from 'react-router'
import v4 from 'uuid'

class Register extends React.Component {
    state = {
        form: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        errors: []
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/register`, {
            method: "POST", 
            body: JSON.stringify(this.state.form),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json())
        .then(res => {
            if (res.errors) {
                this.setState({
                    errors: [...res.errors]
                })
            } else {
                localStorage.setItem("token", res.id)
                return this.props.history.push(`/portfolio`)
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            form: {...this.state.form, [e.target.name]: e.target.value}
        })
    }

    renderErrors = () => {
        return this.state.errors.map( error => {
            return <div key={ v4() }>{error}</div>
        })
    }

    render() {
        return(
            <>
                <div className="error">
                {this.state.errors ? this.renderErrors() : null}
                </div>
                <div className="register">
                    <h1>Register</h1>
                    <form>
                        First Name:
                        <input
                            name="firstName" 
                            type="text" 
                            value={this.state.form.firstName}
                            onChange={this.handleChange}/>
                        Last Name:
                        <input
                            name="lastName" 
                            type="text" 
                            value={this.state.form.lastName}
                            onChange={this.handleChange}/>
                        Email:
                        <input
                            name="email" 
                            type="text" 
                            value={this.state.form.email}
                            onChange={this.handleChange}/>
                        Password:
                        <input
                            name="password"
                            type="password" 
                            value={this.state.form.password}
                            onChange={this.handleChange}/>
                        <button type="submit" onClick={this.handleSubmit}>Login </button>
                    </form>
                </div>
            </>
        )
    }
}

export default (withRouter(Register))
