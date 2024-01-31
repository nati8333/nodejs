
import React, { FormEvent } from 'react'
import { BsSearch } from 'react-icons/bs'

interface SearchFunc {
    (query: string): boolean;
}

export interface SearchBarProps {
    onSearch?: SearchFunc
}

export interface SearchBarState {
    query: string
}

class SearchBar extends React.Component<SearchBarProps,SearchBarState> {

    props: SearchBarProps = {};
    state: SearchBarState = { query: '' };

    constructor(props: SearchBarProps) {
        super(props);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault(); 
        const query = '';//event.target['q'].value;
        this.setState({
            query: query
        });
        if(this.props.onSearch)
            this.props.onSearch(query);
    }

    render() {
        return (
            <form id="searchBar" className="d-flex float-right" method="get" onSubmit={this.handleSubmit.bind(this)}>
                <div className="input-group">
                <input className="form-control" type="search" name="q" placeholder="Search" aria-label="Search" />
                <button className="btn btn-primary d-flex align-items-center" title="search" type="submit"><BsSearch /></button>
                </div>
            </form>
        );
    }
}

export default SearchBar;
