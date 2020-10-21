import React, {Component} from 'react';
import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import PostStatusFilter from '../post-status-filter/';
import PostList from '../post-list/';
import PostAddForm from '../post-add-form';
import nextId from "react-id-generator";

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
            margin: 0 auto;
            max-width: 800px;
`;



export default class App extends Component {
    
    state = {
        data: [
            {
                label: 'Изучаю React для трудоустройства', 
                important: true,
                like: false,
                id: nextId()
            },
            {
                label: 'Это очень обширная и интересная библиотека', 
                important: false,
                like: false,
                id: nextId()
            },
            {
                label: 'Кажется, мне нужно немного передохнуть...', 
                important: false,
                like: false,
                id: nextId()
            }
        ],
        term: '',
        filter: 'all'
    };

    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: nextId()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];

            return {
                data: newArr
            }
        });
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    onToggleImportant = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important}
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    } 

    onToggleLike = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like}
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items
        } else {
            return items.filter((item) => {
                return item.label.indexOf(term) > -1;
            })
        }
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state; 
        const likedPosts = data.filter(item => item.like).length;
        const allPosts = data.length;
        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                    likedPosts={likedPosts}
                    allPosts={allPosts}
            />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike}
                    />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </AppBlock>
        );
    }

    
}