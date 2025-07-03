import { styled } from 'styled-components';
import ListItem from './ListItem';
import { useRecoilValue } from 'recoil';
import { listState } from '../../data/habitData';
import { useEffect } from 'react';

interface ListProps {
  habitId: string | undefined;
}

const ListWrapper = styled.div`
  width: 100%;
  background-color: var(--bg-200);
  padding: 2rem;
  border-radius: 20px;
`;

export default function List({ habitId }: ListProps) {
  const lists = useRecoilValue(listState);
  const list = lists.filter((item) => item.id === habitId)[0]?.list || [];

  return (
    <ListWrapper>
      {list.map((item) => {
        return <ListItem key={item.id} item={item} habitId={habitId} />;
      })}
    </ListWrapper>
  );
}
