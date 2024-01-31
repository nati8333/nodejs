
import React, { ReactNode } from 'react'

import HomePage from './page/Home.tsx'
import LoginPage from './page/Login.tsx'
import RegisterPage from './page/Register.tsx'

export interface MainContentProps {
    className: string,
    page?: string,
    children?: ReactNode,
}

class MainContent extends React.Component<MainContentProps> {

    props: MainContentProps = {
        className: '',
        page: '',
        children: undefined,
    };

    constructor(props: MainContentProps) {
        super(props);
    }

    render() {
        if(this.props.page)
        {
            const page = this.props.page.toLowerCase();
            let pageContent;
            switch(page) {
                case 'home': pageContent = <HomePage />; break;
                case 'login': pageContent = <LoginPage />; break;
                case 'register': pageContent = <RegisterPage />; break;
                default: pageContent = <></>; break;
            }
            return (
                <div id="mainContent" className={this.props.className}>
                    {pageContent}
                </div>
            );
        }
        return (
            <div id="mainContent" className={this.props.className}></div>
        );
    }
}

export default MainContent;
