import React from 'react'
import { withRouter } from 'react-router'

class Login extends React.Component {

    state = {
        form: {
            email: "",
            password: ""
        },
        errors: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/login`, {
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
                localStorage.setItem("token", res.user.id)
                return this.props.history.push(`/portfolio`)
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            form: {...this.state.form, [e.target.name]: e.target.value}
        })
    }

    render() {
        return(
            <>
                <div className="login">
                    <h1>Login</h1>
                    {this.state.errors ? <font color="red">{this.state.errors}</font> : null} 
                    <form>
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

export default (withRouter(Login))