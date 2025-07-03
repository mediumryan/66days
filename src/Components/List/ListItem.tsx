import { useRecoilState, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

// import state data
import {
  failModalState,
  failTitleState,
  habitState,
  HabitType,
  listState,
  ListType,
} from '../../data/habitData';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface ListItemProps {
  item: ListType;
  habitId: string | undefined;
}

interface ListButtonsProps {
  failCnt: number;
}

interface ListItemContainerProps {
  condition: boolean;
}

const ListItemContainer = styled.div<ListItemContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--margin-medium);
  padding: var(--padding-medium) 0;
  font-size: var(--font-size-micro);
  border-bottom: 1px solid var(--accent-100);
  opacity: ${(props) => (props.condition ? '50%' : '100%')};
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
    failCnt: 0,
    isDone: false,
  });

  const [date, setDate] = useState('');

  const [list, setList] = useRecoilState(listState);

  const listIndex = list.findIndex((l) => l.id === habitId);

  const displayWarning = () => {
    const toDay = new Date().toISOString().split('T')[0];

    console.log('toDay', toDay);
    console.log('date', date);

    if (toDay !== date) {
      Swal.fire({
        title: 'Umm,,',
        text: "You only can complete / fail today's habit.",
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return true;
    }
    return false;
  };

  const shiftList = () => {
    if (listIndex !== -1) {
      const newList = structuredClone(list);
      let targetList = newList[listIndex].list;
      const target = targetList[0];
      target.isDone = true;
      targetList.shift();
      targetList.push(target);
      setList(newList);
    }
  };

  // handle complete
  const handleComplete = (habit: HabitType) => {
    let newHabits = habits.map((h) => {
      return { ...h };
    });
    const itemIndex = newHabits.findIndex((h) => h.id === habit.id);

    if (displayWarning()) return;

    newHabits[itemIndex].completeCnt += 1;

    shiftList();

    if (habit.completeCnt + habit.failCnt + 1 === 66) {
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

  const handleFail = (habit: HabitType, flag?: string) => {
    let newHabits = habits.map((item) => {
      return { ...item };
    });
    if (flag !== 'auto') {
      if (displayWarning()) return;
    }

    const itemIndex = newHabits.findIndex((h) => h.id === habit.id);
    if (itemIndex !== -1) {
      newHabits[itemIndex].failCnt += 1;
      shiftList();
      if (newHabits[itemIndex].failCnt === 3) {
        setFailTitle(habit.title);
        newHabits[itemIndex].isDone = true;
        setFailModal(true);
      }
      setHabits(newHabits);
    }
  };

  const setDisabled = () => {
    return (
      habit.title === '' ||
      habit.start === '' ||
      habit.end === '' ||
      habit.isDone ||
      habit.failCnt === 3 ||
      item.isDone
    );
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
        failCnt: habits[habitNumber].failCnt,
        isDone: habits[habitNumber].isDone,
      });
      const startDate = new Date(habits[habitNumber].start);
      startDate.setDate(startDate.getDate() + item.value);
      const formattedDate = startDate.toISOString().split('T')[0];
      setDate(formattedDate);

      console.log('formattedDate', formattedDate);
      console.log('today', new Date().toISOString().split('T')[0]);
      console.log('item', item);

      if (
        !item.isDone &&
        formattedDate < new Date().toISOString().split('T')[0]
      ) {
        handleFail(habit, 'auto');
      }
    }
  }, []);

  return (
    <ListItemContainer condition={item.isDone}>
      <ListTitle>
        {habit.title + '\u00A0' + (item.value + 1) + '일차'}
      </ListTitle>
      <ListDate>{date}</ListDate>
      <ListButton failCnt={habit.failCnt}>
        <button
          onClick={() => {
            handleComplete(habit);
          }}
          disabled={setDisabled()}
        >
          Complete
        </button>
        <button
          onClick={() => {
            handleFail(habit);
          }}
          disabled={setDisabled()}
        >
          Fail
        </button>
      </ListButton>
    </ListItemContainer>
  );
}
