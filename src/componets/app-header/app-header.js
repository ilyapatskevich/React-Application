import React from 'react';

import './app-header.css';
import styled from 'styled-components';

const Header = styled.div`
        align-items: flex-end;
        justify-content: space-between;
        display: flex;
        h1 {
            font-size: 26px;
            color: ${props => props.colored ? 'red' : 'black'};
            :hover {
                color: blue;
            }
        }
        h2 {
            font-size: 1.2rem;
            color: grey;
        }
`;

const AppHeader = ({likedPosts, allPosts}) => {
    return (
        <Header>
            <h1>Илья Пацкевич</h1>
            <h2>{allPosts} записей, из них понравилось {likedPosts}</h2>
        </Header>
    )
}

export default AppHeader;