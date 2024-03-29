import { styled } from 'styled-components';
import ListItem from './ListItem';
import { useRecoilValue } from 'recoil';
import { listState } from '../../data/habitData';

const ListWrapper = styled.div`
    width: 100%;
    background-color: var(--bg-200);
    padding: 2rem;
    border-radius: 20px;
`;

export default function List({ habitNumber }) {
    const list = useRecoilValue(listState);

    return (
        <ListWrapper>
            {list[habitNumber].slice(0, 4).map((item) => {
                return (
                    <ListItem
                        key={item.id}
                        item={item}
                        habitNumber={habitNumber}
                    />
                );
            })}
        </ListWrapper>
    );
}
