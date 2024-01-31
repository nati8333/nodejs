
import React from 'react'

import NavigationHeader, { NavLinkProps } from './NavigationHeader.tsx';
import Sidebar from './Sidebar.tsx';
import MainContent from './MainContent.tsx';
import Cookie from '../lib/Cookie.ts';

interface MainLayoutProps {
}

interface MainLayoutState {
    page?: string
}

class MainLayout extends React.Component<MainLayoutProps,MainLayoutState> {

    state: MainLayoutState = {
        page: 'Home'
    };

    constructor(props: MainLayoutProps) {
        super(props);
    }

    componentDidMount() {
        let cookiePage = Cookie.get('page');
        if(!cookiePage || cookiePage === '')
            cookiePage = Cookie.set('page', 'Home');
        this.setState({
            page: cookiePage
        });
    }

    handleNavigate(link: NavLinkProps) {
        const page = link.title;
        this.setState({
            page: page
        });
        Cookie.set('page', page);
    }

    render() {
        return (
            <>
                <NavigationHeader id="header" className="shadow sticky-top" page={this.state.page} onNavigate={this.handleNavigate.bind(this)}/>
                <div id="sidebar_mainContent" className="overflow-y-auto h-80">
                    <Sidebar className="col-3 collapse p-2 bg-dark text-light" />
                    <MainContent className="d-flex col p-2" page={this.state.page} />
                </div>
            </>
        );
    }
}

export default MainLayout;
