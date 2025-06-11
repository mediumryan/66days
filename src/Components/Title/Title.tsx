import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
// icons
import { SlNote } from 'react-icons/sl';
import { habitState, HabitType } from '../../data/habitData';

interface TitleType {
  habit: HabitType;
}

export const ItemSectionWrapper = styled.div`
  position: relative;
  background-color: var(--bg-200);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 1rem 2rem;
  & > div:first-child {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const ItemContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    width: 100%;
    text-align: center;
    font-size: 1.05rem;
    font-weight: 700;
  }
  svg {
    position: absolute;
    right: 4px;
    color: var(--primary-200);
  }
`;

export const AddToItem = styled.button`
  font-size: 1.05rem;
  background-color: var(--primary-200);
  color: var(--accent-100);
  padding: 0.5rem 1rem;
  border-radius: 10px;
`;

export const FormContents = styled.div`
  align-items: center;
  input {
    padding: var(--padding-double-small);
    font-size: var(--font-size-small);
    border: 1px solid var(--primary-100);
    border-radius: 10px;
  }
  button {
    padding: var(--padding-double-small);
    font-size: var(--font-size-small);
    margin-left: var(--margin-small);
    transition: 300ms all;
    &:hover {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }
`;

export default function Title({ habit }: TitleType) {
  const [habits, setHabits] = useRecoilState(habitState);

  const handleTitle = () => {
    Swal.fire({
      title: 'Habit',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Please, Enter your habit title';
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedHabits = habits.map((h) => {
          if (h.id === habit?.id) {
            return { ...h, title: result.value };
          }
          return h;
        });
        setHabits(updatedHabits);
      }
    });
  };

  return (
    <ItemSectionWrapper>
      {habit.title ? (
        <ItemContent>
          <p>{habit.title}</p>
          <SlNote onClick={handleTitle} />
        </ItemContent>
      ) : (
        <AddToItem onClick={handleTitle}>Add to Habit</AddToItem>
      )}
    </ItemSectionWrapper>
  );
}
