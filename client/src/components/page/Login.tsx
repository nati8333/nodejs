
import React, { ChangeEvent, FormEvent } from 'react'

export interface LoginPageProps {
}

export interface LoginPageState {
    email: string,
    password: string,
    keepMeLoggedIn: boolean,
}

class LoginPage extends React.Component<LoginPageProps,LoginPageState> {

    state: LoginPageState = {
        email: '',
        password: '',
        keepMeLoggedIn: false,
    };

    constructor(props: LoginPageProps) {
        super(props);
    }

    handleChange(name: 'email' | 'password' | 'keepMeLoggedIn', event: ChangeEvent<HTMLInputElement>) {
        if(name === 'email')
            this.setState({email: event.target.value});
        else if(name === 'password')
            this.setState({password: event.target.value});
        else if(name === 'keepMeLoggedIn')
            this.setState({keepMeLoggedIn: event.target.checked});
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(this.state);
        // const email    = this.state.email;
        // const password = this.state.password;
        // const keepMeLoggedIn = this.state.keepMeLoggedIn;
    }

    render() {
        return (
            <div className="bg-light m-3 p-3 border shadow mx-auto col-xl-4 col-lg-5 col-md-6 col-10 align-self-center">
                <div className="h2 mb-2 pb-2 border-bottom">Login</div>
                <form name="loginForm" className="" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="my-2">
                        <label htmlFor="inputEmailLogin" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="inputEmailLogin" 
                            onChange={this.handleChange.bind(this, 'email')}
                            value={this.state.email || ""} />
                    </div>
                    <div className="my-2">
                        <label htmlFor="inputPasswordLogin" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="inputPasswordLogin" 
                            onChange={this.handleChange.bind(this, 'password')}
                            value={this.state.password || ""} />
                    </div>
                    <div className="my-2">
                        <div className="form-check">
                        <input type="checkbox" id="checkKeepMeLoggedIn" name="keepMeLoggedIn" className="form-check-input" 
                            checked={this.state.keepMeLoggedIn || false}
                            onChange={this.handleChange.bind(this, 'keepMeLoggedIn')}
                            />
                        <label htmlFor="checkKeepMeLoggedIn" className="form-check-label">
                            Keep me logged in
                        </label>
                        </div>
                    </div>
                    <div className="">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;
