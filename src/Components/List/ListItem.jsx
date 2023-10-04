import { styled } from 'styled-components';

const ListItemContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default function ListItem() {
    return (
        <ListItemContainer>
            <button>com</button>
            <span>Text</span>
            <button>fail</button>
        </ListItemContainer>
    );
}
