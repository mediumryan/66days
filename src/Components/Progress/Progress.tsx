import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Swal from 'sweetalert2';
// icons
import { SlNote } from 'react-icons/sl';
import { AddToItem, ItemContent, ItemSectionWrapper } from '../Title/Title';
import { habitState, HabitType } from '../../data/habitData';

interface ProgressProps {
  habit: HabitType;
}

export const BackProgressBar = styled.div`
  background-color: var(--bg-300);
  border-radius: 8px;
  width: 100%;
  height: 25px;
  overflow: hidden;
  margin: var(--margin-medium-large) 0;
`;

export const ProgressBar = styled.div`
  background-color: var(--primary-200);
  height: 100%;
`;

export default function Progress({ habit }: ProgressProps) {
  const [habits, setHabits] = useRecoilState(habitState);

  const handleDate = () => {
    Swal.fire({
      title: 'Start Date',
      input: 'date',
      didOpen: () => {
        const input = Swal.getInput();
        if (input) {
          const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
          input.min = today;
        }
      },
    }).then((result) => {
      if (result.value) {
        const baseDate = new Date(result.value);

        // 66일 후
        const daysToAdd = 66;
        const resultDate = new Date(baseDate);
        resultDate.setDate(baseDate.getDate() + daysToAdd);

        // 결과를 YYYY-MM-DD 형식으로 출력
        const yyyy = resultDate.getFullYear();
        const mm = String(resultDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
        const dd = String(resultDate.getDate()).padStart(2, '0');

        const end = `${yyyy}-${mm}-${dd}`;
        setHabits((prev) => {
          const updatedHabits = prev.map((h) => {
            if (h.id === habit.id) {
              return { ...h, start: result.value, end };
            }
            return h;
          });
          return updatedHabits;
        });
      }
    });
  };

  return (
    <ItemSectionWrapper>
      <div>
        <span>{habit.completeCnt + habit.fileCnt} / 66</span>
        <span>
          {Math.trunc(((habit.completeCnt + habit.fileCnt) / 66) * 100)}%
        </span>
      </div>
      <BackProgressBar>
        <ProgressBar
          style={{
            width: `${Math.trunc(
              Math.trunc(((habit.completeCnt + habit.fileCnt) / 66) * 100)
            )}%`,
          }}
        />
      </BackProgressBar>
      {habit.start && habit.end ? (
        <ItemContent>
          <p>
            {habit.start.slice(5)} ~{habit.end.slice(5)}
          </p>
          <SlNote onClick={handleDate} />
        </ItemContent>
      ) : (
        <AddToItem onClick={handleDate}>Add to Start date</AddToItem>
      )}
    </ItemSectionWrapper>
  );
}
