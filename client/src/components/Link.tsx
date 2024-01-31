
import React, { ReactNode } from 'react'

export interface LinkProps {
    to: string,
    children: ReactNode
}

class Link extends React.Component<LinkProps> {

    props: LinkProps = {
        to: '',
        children: undefined
    };

    constructor(props: LinkProps) {
        super(props);
    }

    render() {
        return (
            <a href={this.props.to}>{this.props.children}</a>
        );
    }
}

export default Link;
