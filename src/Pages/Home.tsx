import { useRecoilState, useSetRecoilState } from 'recoil';
// import { PageWrapper } from './Habit';
import {
  failModalState,
  failTitleState,
  habitState,
  HabitType,
  listState,
  ListType,
  userNameState,
} from '../data/habitData';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SlNote } from 'react-icons/sl';
import { FaLocationArrow, FaPlusCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

type InputType = {
  user: string;
};

type ListProps = {
  isDone: boolean;
};

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: var(--padding-medium-large);
  padding-bottom: 5rem;
  background-color: var(--bg-100);
  color: var(--text-100);
  overflow-y: scroll;
`;

const HomeHello = styled.h2`
  color: var(--primary-100);
`;

const HomeHelloForm = styled.form`
  flex-direction: column;
  label {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  & > div {
    display: flex;
    justify-content: center;
    input {
      width: 80%;
      border: 0.5px solid var(--primary-100);
      border-radius: 8px;
      padding: 2px 8px;
      margin-right: 0.5rem;
      text-align: center;
    }
    button {
      font-size: 1.5rem;
      color: var(--primary-100);
    }
  }
`;

const HomeHelloContent = styled.div`
  font-size: 1.5rem;
  & > span {
    position: relative;
    overflow: auto;
    button {
      position: absolute;
      top: 0;
      right: -3rem;
      font-size: 1.25rem;
      color: var(--primary-100);
    }
  }
`;

const HomeItemWrapper = styled.ul`
  width: 100%;
  background-color: var(--bg-200);
  color: var(--text-200);
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const HomeItem = styled.li<ListProps>`
  position: relative;
  margin-bottom: 2rem;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  filter: ${(props) => (props.isDone ? 'grayscale(100%)' : 'none')};
  &:nth-child(odd) {
    background-color: var(--bg-100);
  }
`;

const HomeTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  & > h3 {
    width: 80%;
    font-size: 1.15rem;
    color: var(--accent-200);
    text-align: center;
  }
  & > a {
    position: absolute;
    right: 4px;
    top: 4px;
    color: var(--primary-200);
    padding: 0.5rem;
    text-decoration: none;
    transition: 300ms all;
    &:hover {
      transform: rotate(15deg);
    }
  }
`;

const HomeProgress = styled.div``;

const HomeFigure = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

const HomeButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
  & > button {
    font-size: 1rem;
    background-color: var(--primary-200);
    color: var(--accent-100);
    padding: 0.5rem 1rem;
    border-radius: 10px;
  }
`;

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

const AddHabitButton = styled(FaPlusCircle)`
  font-size: 2rem;
  color: var(--primary-100);
`;

export default function Home() {
  const [habits, setHabits] = useRecoilState(habitState);
  const setHabitList = useSetRecoilState(listState);
  const setFailModal = useSetRecoilState(failModalState);
  const setFailTitle = useSetRecoilState(failTitleState);

  const [list, setList] = useRecoilState(listState);

  // handle user name
  const { register, setValue, handleSubmit } = useForm<InputType>();
  const [user, setUser] = useRecoilState(userNameState);
  const handleUserName: SubmitHandler<InputType> = (data) => {
    if (data.user.trim() === '') {
      alert('Please enter your name or nickname.');
      return;
    }
    setUser((prev) => {
      const newUser = { ...prev };
      newUser.name = data.user;
      newUser.submitted = true;
      return newUser;
    });
    setValue('user', '');
  };

  // handle complete
  const handleComplete = (habit: HabitType) => {
    let newHabits = habits.map((item) => {
      return { ...item };
    });
    const itemIndex = newHabits.findIndex((item) => item.id === habit.id);
    newHabits[itemIndex].completeCnt += 1;
    if (habit.completeCnt + habit.failCnt + 1 === 66) {
      newHabits[itemIndex].isDone = true;
      setHabits(newHabits);
      alert(`${habit.title} Project complete. Congratulation!`);
      return;
    }

    setHabits(newHabits);
  };

  // handle fail
  const handleFail = (habit: HabitType) => {
    let newHabits = habits.map((item) => {
      return { ...item };
    });
    const itemIndex = newHabits.findIndex((item) => item.id === habit.id);
    newHabits[itemIndex].failCnt += 1;
    if (newHabits[itemIndex].failCnt === 3) {
      setFailTitle(habit.title);
      newHabits[itemIndex].isDone = true;
      setFailModal(true);
    }
    setHabits(newHabits);
  };

  const setButtonDisabled = (habit: HabitType) => {
    return (
      habit.title === '' ||
      habit.start === '' ||
      habit.end === '' ||
      habit.isDone
    );
  };

  const addHabit = () => {
    if (habits.length >= 10) {
      Swal.fire({
        title: 'Max Habit : 10',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
    const id = Date.now().toString();
    setHabits((prev) => {
      const newHabit: HabitType = {
        id,
        title: '',
        start: '',
        end: '',
        completeCnt: 0,
        failCnt: 0,
        isDone: false,
      };
      return [...prev, newHabit];
    });
    setHabitList((prev) => {
      const newList = [...prev];
      newList.push({
        id,
        list: Array.from({ length: 66 }, (_, index) => ({
          id: `${id}-${index}`,
          value: index,
          date: '',
          isDone: false,
        })),
      });
      return newList;
    });
  };

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updatedFailCounts: Record<string, number> = {};

    // list 상태 업데이트
    const updatedLists = list.map((habitList) => {
      const newList: ListType[] = [];
      const failedItems: ListType[] = [];

      habitList.list.forEach((item) => {
        // 실패 조건: 과거 날짜 + 완료되지 않음
        if (!item.isDone && item.date < todayStr) {
          updatedFailCounts[habitList.id] =
            (updatedFailCounts[habitList.id] || 0) + 1;

          // 실패 처리된 항목은 맨 뒤로 보내기 위해 따로 저장
          failedItems.push({ ...item, isDone: true });
        } else {
          newList.push(item);
        }
      });

      return {
        ...habitList,
        list: [...newList, ...failedItems], // 실패 항목을 뒤로 이동
      };
    });

    setList(updatedLists);

    // habits 상태 업데이트
    const updatedHabits = habits.map((habit) => {
      const addFails = updatedFailCounts[habit.id] || 0;
      const newFailCnt = habit.failCnt + addFails;
      const isHabitDone = newFailCnt >= 3;

      if (addFails > 0 || isHabitDone) {
        return {
          ...habit,
          failCnt: newFailCnt,
          isDone: isHabitDone ? true : habit.isDone,
        };
      }

      return habit;
    });

    setHabits(updatedHabits);
  }, []);

  useEffect(() => {
    console.log(habits);
    console.log(habits);
    console.log(habits);
    console.log(habits);
  }, [habits]);

  return (
    <PageWrapper>
      <HomeHello>
        <HomeHelloForm
          onSubmit={handleSubmit(handleUserName)}
          style={{ display: user.submitted ? 'none' : 'flex' }}
        >
          <label>What is your name?</label>
          <div>
            <input
              placeholder="Your name or nickname"
              {...register('user', {
                required: true,
                maxLength: 25,
              })}
            />
            <button>+</button>
          </div>
        </HomeHelloForm>
        <HomeHelloContent
          style={{ display: user.submitted ? 'block' : 'none' }}
        >
          <span>
            Hello, {user.name}.
            <button
              onClick={() => {
                setUser((prev) => {
                  const newUser = { ...prev };
                  newUser.submitted = false;
                  return newUser;
                });
              }}
            >
              <SlNote />
            </button>
          </span>
        </HomeHelloContent>
      </HomeHello>
      <HomeItemWrapper>
        {habits.map((item) => {
          return (
            <HomeItem key={item.id} isDone={item.isDone}>
              <HomeTitle>
                <h3>{item.title ? item.title : 'Empty Habit'} </h3>
                <Link to={`/habit/${item.id}`}>
                  <FaLocationArrow />
                </Link>
              </HomeTitle>
              <HomeProgress>
                <BackProgressBar>
                  <ProgressBar
                    style={{
                      width: `${Math.trunc(
                        ((item.completeCnt + item.failCnt) / 66) * 100
                      )}%`,
                    }}
                  />
                </BackProgressBar>
              </HomeProgress>
              <HomeFigure>
                <span>
                  {item.start && item.end
                    ? `${item.start.slice(5)} ~ ${item.end.slice(5)}`
                    : ''}
                </span>
                <span>
                  {Math.trunc(((item.completeCnt + item.failCnt) / 66) * 100)}%
                </span>
              </HomeFigure>
              <HomeButtons>
                <button
                  onClick={() => {
                    handleComplete(item);
                  }}
                  disabled={setButtonDisabled(item)}
                >
                  Complete ({item.completeCnt})
                </button>
                <button
                  onClick={() => {
                    handleFail(item);
                  }}
                  disabled={setButtonDisabled(item)}
                  style={{
                    backgroundColor: item.failCnt === 2 ? '#FF4D4D' : '#61398f',
                  }}
                >
                  Fail ({item.failCnt})
                </button>
              </HomeButtons>
            </HomeItem>
          );
        })}
        <AddHabitButton onClick={addHabit} />
      </HomeItemWrapper>
    </PageWrapper>
  );
}
