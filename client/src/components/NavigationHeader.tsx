
import React, { ReactNode, MouseEvent, MouseEventHandler } from 'react'
import SearchBar from './SearchBar.tsx';

export interface NavLinkProps {
    title: string,
    isActive?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

class NavLink extends React.Component<NavLinkProps> {

    props: NavLinkProps = {
        title: ''
    };

    constructor(props: NavLinkProps) {
        super(props);
    }

    render() {
        if(this.props.isActive)
            return (<button type="button" className="nav-link text-start active" aria-current="page" onClick={this.props.onClick} data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                title={this.props.title}>{this.props.title}</button>);
        else
            return (<button type="button" className="nav-link text-start" onClick={this.props.onClick} data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                title={this.props.title}>{this.props.title}</button>);
    }
}


interface OnNavigate {
    (navLink: NavLinkProps): void
}

export interface NavLinksProps {
    onNavigate?: OnNavigate
    page?: string,
}

export interface NavLinksState {
    links?: Array<NavLinkProps>,
    active?: number,
}

class NavLinks extends React.Component<NavLinksProps,NavLinksState> {

    props: NavLinksProps = {};

    state: NavLinksState = {
        links: [
            { title: 'Home', isActive: true },
            { title: 'Login' },
            { title: 'Register' },
        ],
        active: 0
    };

    constructor(props: NavLinksProps) {
        super(props);
    }

    componentDidMount() {
    }

    updatePage() {
        const { links } = this.state;
        if(this.props.page && links)
        {
            const activeLink = links.find((navLink) => navLink.isActive);
            if(activeLink)
                activeLink.isActive = false;
            const newActiveLink = links.find((navLink) => navLink.title == this.props.page);
            if(newActiveLink)
                newActiveLink.isActive = true;
        }
    }

    handleClick(event: MouseEvent<HTMLButtonElement>) {
        const linkTitle = event.currentTarget.title;
        // find and set the previously active nav-link to inactive
        const { links } = this.state;
        if(links)
        {
            const activeLink = links.find((navLink) => navLink.isActive);
            if(activeLink)
                activeLink.isActive = false;
            // find and set the clicked nav-link to active
            const newActiveLink = links.find((navLink) => navLink.title === linkTitle);
            let   newActiveLinkIndex = 0;
            if(links && newActiveLink)
            {
                  newActiveLinkIndex = links.indexOf(newActiveLink);
                newActiveLink.isActive = true;
            }
            this.setState({
                links: links,
                active: newActiveLinkIndex
            });
            // call the onNavigate callback function if set
            if(newActiveLink && this.props.onNavigate)
                this.props.onNavigate(newActiveLink);
        }
    }

    render() {
        this.updatePage();
        return (
            <div className="navbar-nav">
                {this.state.links?.map((link, index) => <NavLink key={index} title={link.title}  isActive={link.isActive} onClick={this.handleClick.bind(this)}/>)}
            </div>
        );
    }
}


export interface NavbarCollapseProps {
    onNavigate?: OnNavigate,
    page?: string,
}

export interface NavbarCollapseState {
    className: string
}

class NavbarCollapse extends React.Component<NavbarCollapseProps,NavbarCollapseState> {

    props: NavbarCollapseProps = {};

    state: NavbarCollapseState = {
        className: "collapse navbar-collapse justify-content-between"
    };

    constructor(props: NavbarCollapseProps) {
        super(props);
    }

    componentDidMount() {
    }

    onNavigate(navLink: NavLinkProps) {
        this.setState({
            className: "collapse navbar-collapse justify-content-between"
        })
        if(this.props.onNavigate)
            this.props.onNavigate(navLink);
    }

    render() {
        return (
            <div className={this.state.className} id="navbarNavAltMarkup">
                <NavLinks page={this.props.page} onNavigate={this.onNavigate.bind(this)} />
                <SearchBar />
            </div>
        );
    }
}

export interface NavigationHeaderProps {
    onNavigate?: OnNavigate,
    id?: string,
    className?: string,
    page?: string,
    children?: ReactNode
}

class NavigationHeader extends React.Component<NavigationHeaderProps> {

    props: NavigationHeaderProps = {
        id: 'header'
    };

    constructor(props: NavigationHeaderProps) {
        super(props);
    }
    
    componentDidMount() {
    }

    render() {
        return (
            <div id={this.props.id} className={this.props.className}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <button type="button" className="navbar-brand btn">On-Shop</button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <NavbarCollapse page={this.props.page} onNavigate={this.props.onNavigate}/>
                    </div>
                </nav>
            </div>
        );
    }
}

export { NavLink, NavLinks };
export default NavigationHeader;
