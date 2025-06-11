import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
// import state data
import {
  failModalState,
  failTitleState,
  habitState,
  HabitType,
  ListType,
} from '../../data/habitData';
import { useEffect, useState } from 'react';

interface ListItemProps {
  item: ListType;
  habitId: string | undefined;
}

interface ListButtonsProps {
  failCnt: number;
}

const ListItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--margin-medium);
  padding: var(--padding-medium) 0;
  font-size: var(--font-size-micro);
  border-bottom: 1px solid var(--accent-100);
`;

const ListTitle = styled.span`
  font-weight: 700;
`;

const ListDate = styled.span`
  font-size: calc(var(--font-size-micro) * 0.75);
  margin: var(--margin-small) 0;
  margin: 0.75rem 0;
`;

const ListButton = styled.div<ListButtonsProps>`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
  button {
    font-size: var(--font-size-micro);
    color: var(--accent-100);
    background-color: var(--primary-200);
    margin: 0 var(--margin-small);
    padding: var(--padding-double-small);
    border-radius: 10px;
    transition: 300ms opacity;
    &:hover {
      opacity: 0.5;
    }
  }
  & > button:last-child {
    background-color: ${(props) =>
      props.failCnt === 2 ? '#FF4D4D' : '#61398f'};
  }
`;

export default function ListItem({ item, habitId }: ListItemProps) {
  const [habits, setHabits] = useRecoilState(habitState);

  const [habit, setHabit] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    completeCnt: 0,
    fileCnt: 0,
    isDone: false,
  });

  const [date, setDate] = useState('');
  // handle complete
  const handleComplete = (habit: HabitType) => {
    let newHabits = habits.map((item) => {
      return { ...item };
    });
    const itemIndex = newHabits.findIndex((item) => item.id === habit.id);
    newHabits[itemIndex].completeCnt += 1;
    if (habit.completeCnt + habit.fileCnt + 1 === 66) {
      newHabits[itemIndex].isDone = true;
      setHabits(newHabits);
      alert(`${habit.title} Project complete. Congratulation!`);
      return;
    }

    setHabits(newHabits);
  };

  // handle fail
  const setFailModal = useSetRecoilState(failModalState);

  const setFailTitle = useSetRecoilState(failTitleState);
  const handleFail = (habit: HabitType) => {
    let newHabits = habits.map((item) => {
      return { ...item };
    });
    const itemIndex = newHabits.findIndex((item) => item.id === habit.id);
    newHabits[itemIndex].fileCnt += 1;
    if (newHabits[itemIndex].fileCnt === 3) {
      setFailTitle(habit.title);
      newHabits[itemIndex].isDone = true;
      setFailModal(true);
    }
    setHabits(newHabits);
  };

  useEffect(() => {
    const habitNumber = habits.findIndex((h) => h.id === habitId);
    if (habitNumber !== -1) {
      setHabit({
        id: habits[habitNumber].id,
        title: habits[habitNumber].title,
        start: habits[habitNumber].start,
        end: habits[habitNumber].end,
        completeCnt: habits[habitNumber].completeCnt,
        fileCnt: habits[habitNumber].fileCnt,
        isDone: habits[habitNumber].isDone,
      });
      const startDate = new Date(habits[habitNumber].start);
      startDate.setDate(startDate.getDate() + item.value);
      setDate(startDate.toISOString().split('T')[0]);
    }
  }, [habitId, habits]);

  return (
    <ListItemContainer>
      <ListTitle>
        {habit.title + '\u00A0' + (item.value + 1) + '일차'}
      </ListTitle>
      <ListDate>{date}</ListDate>
      <ListButton failCnt={habit.fileCnt}>
        <button
          onClick={() => {
            handleComplete(habit);
          }}
          disabled={habit.isDone || habit.fileCnt === 3}
        >
          Complete
        </button>
        <button
          onClick={() => {
            handleFail(habit);
          }}
          disabled={habit.fileCnt === 3}
        >
          Fail
        </button>
      </ListButton>
    </ListItemContainer>
  );
}
