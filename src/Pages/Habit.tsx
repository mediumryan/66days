import { styled } from 'styled-components';
import Title from '../Components/Title/Title';
import Progress from '../Components/Progress/Progress';
import List from '../Components/List/List';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
// import icons
import { FaBackward } from 'react-icons/fa';
import { PageWrapper } from './Home';
import { habitState, HabitType } from '../data/habitData';
import RemoveHabit from '../RemoveHabit';

type HabitProps = {
  isDone: boolean;
};

export const HabitWrapper = styled(PageWrapper)<HabitProps>`
  filter: ${(props) => (props.isDone ? 'grayscale(100%)' : 'none')};
  pointer-events: ${(props) => (props.isDone ? 'none' : 'auto')};
`;

export const TagName = styled.h3`
  color: var(--primary-200);
  font-size: var(--font-size-medium);
  margin: var(--margin-medium) 0;
`;

const GoBack = styled(FaBackward)`
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: var(--font-size-micro);
  color: var(--accent-100);
  transition: 300ms all;
  pointer-events: auto;
  &:hover {
    color: var(--primary-200);
    transform: scale(1.05);
  }
`;

export default function Habit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const habits = useRecoilValue(habitState);
  const habitIndex = habits.findIndex((habit: HabitType) => habit.id === id);

  return (
    <HabitWrapper isDone={habits[habitIndex].isDone}>
      <RemoveHabit habit={habits[habitIndex]} />
      <GoBack
        onClick={() => {
          navigate(-1);
        }}
      />
      <TagName>Habit</TagName>
      <Title habit={habits[habitIndex]} />
      <TagName>Progress</TagName>
      <Progress habit={habits[habitIndex]} />
      <TagName>Check List</TagName>
      {habits[habitIndex].title && habits[habitIndex].start && (
        <List habitId={id} />
      )}
      {/* <TagName>Complete ({complete[id].count})</TagName> */}
      {/* <Complete habitNumber={id} /> */}
      {/* <TagName>Fail ({fail[id].count})</TagName> */}
      {/* <Fail habitNumber={id} /> */}
    </HabitWrapper>
  );
}
