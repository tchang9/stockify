import React from 'react'

class Login extends React.Component {

    state = {
        form: {
            email: "",
            password: ""
        }
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
            if (res.message) {
                console.log(res.message)
            } else {
                console.log("hellooooo")
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
                <h1>Login</h1>
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
            </>
        )
    }
}

export default Login