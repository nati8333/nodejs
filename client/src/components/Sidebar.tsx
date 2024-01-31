
import React from 'react'

export interface SidebarProps {
    className?: string
}

class Sidebar extends React.Component<SidebarProps> {

    props: SidebarProps = {};

    render() {
        return (
            <div id="sidebar" className={this.props.className}>
                <ul className="list-group">
                    <li className="list-group-item">option a</li>
                    <li className="list-group-item">option b</li>
                    <li className="list-group-item">option c</li>
                    <li className="list-group-item">option d</li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
