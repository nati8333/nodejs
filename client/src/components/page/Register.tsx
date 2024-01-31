
import React, { ChangeEvent, FormEvent } from 'react'

export interface RegisterPageProps {
}

export interface RegisterPageState {
    email: string,
    password: string,
}

class RegisterPage extends React.Component<RegisterPageProps,RegisterPageState> {

    state: RegisterPageState = {
        email: '',
        password: '',
    };

    constructor(props: RegisterPageProps) {
        super(props);
    }

    handleChange(name: 'email' | 'password', event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if(name === 'email')
            this.setState({email: value});
        else if(name === 'password')
            this.setState({password: value});
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(this.state);
        // const email    = this.state.email;
        // const password = this.state.password;
    }

    render() {
        return (
            <div className="bg-light m-3 p-3 border shadow mx-auto col-xl-4 col-lg-5 col-md-6 col-10 align-self-center">
                <div className="h2 mb-2 pb-2 border-bottom">Register</div>
                <form name="registerForm" className="" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="my-2">
                        <label htmlFor="inputEmailRegister" className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" id="inputEmailRegister" 
                            onChange={this.handleChange.bind(this, 'email')}
                            value={this.state.email || ""} />
                    </div>
                    <div className="my-2">
                        <label htmlFor="inputPasswordRegister" className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" id="inputPasswordRegister" 
                            onChange={this.handleChange.bind(this, 'password')}
                            value={this.state.password || ""} />
                    </div>
                    <div className="">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterPage;
