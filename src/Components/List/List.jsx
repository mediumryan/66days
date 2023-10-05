import { styled } from 'styled-components';
import ListItem from './ListItem';
import { useRecoilValue } from 'recoil';
import { listState } from '../../atom';

const ListWrapper = styled.div`
    width: 100%;
    background-color: var(--bg-200);
    padding: var(--padding-double-medium);
    border-radius: 20px;
`;

export default function List() {
    const list = useRecoilValue(listState);

    return (
        <ListWrapper>
            {list.slice(0, 4).map((item) => {
                return <ListItem key={item.id} item={item} />;
            })}
        </ListWrapper>
    );
}
