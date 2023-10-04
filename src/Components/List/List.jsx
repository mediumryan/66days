import { styled } from 'styled-components';
import ListItem from './ListItem';

const ListWrapper = styled.div`
    width: 100%;
    background-color: blue;
`;

export default function List() {
    return (
        <ListWrapper>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </ListWrapper>
    );
}
