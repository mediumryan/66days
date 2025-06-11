import { styled } from 'styled-components';
import Swal from 'sweetalert2';
import { habitState, HabitType, listState } from './data/habitData';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

interface RemoveHabitProps {
  habit: HabitType;
}

const RemoveHabitButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  font-size: var(--font-size-micro);
  font-weight: 800;
  color: var(--accent-100);
  transition: 300ms all;
  pointer-events: auto;
  & > svg {
    font-size: 1.25rem;
  }
  &:hover {
    color: var(--primary-200);
    transform: scale(1.05);
  }
`;

// const RemoveHabitModal = styled.div`
//   position: fixed;
//   top: 10%;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 85%;
//   height: 50%;
//   background-color: rgba(0, 0, 0, 0.85);
//   color: orange;
//   z-index: 5;
//   border-radius: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-evenly;
//   span {
//     font-size: var(--font-size-medium);
//   }
//   div {
//     button {
//       font-size: var(--font-size-micro);
//       color: orange;
//       border: 1px solid orange;
//       border-radius: 4px;
//       padding: var(--padding-micro) var(--padding-medium);
//       margin: var(--margin-micro);
//     }
//   }
// `;

export default function RemoveHabit({ habit }: RemoveHabitProps) {
  const router = useNavigate();

  const setHabits = useSetRecoilState(habitState);
  const setHabitList = useSetRecoilState(listState);

  const handleRemoveHabit = () => {
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: 'Remove',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(`${habit.title} project is removed`, '', 'success');

        // Remove habit and habit list data
        setHabits((prev) => prev.filter((h) => h.id !== habit.id));
        setHabitList((prev) => prev.filter((list) => list.id !== habit.id));

        // navigate to home page
        router('/');
      } else {
        return;
      }
    });
  };

  return (
    <RemoveHabitButton onClick={handleRemoveHabit}>
      <FaTrashAlt />
    </RemoveHabitButton>
  );
}
