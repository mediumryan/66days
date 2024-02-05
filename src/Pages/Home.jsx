import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PageWrapper } from './Habit';
import {
    completeState,
    dateState,
    endDateState,
    failModalState,
    failState,
    failTitleState,
    listState,
    titleState,
    userNameState,
} from '../data/habitData';
import { styled } from 'styled-components';
import { ProgressBarBack, ProgressBar } from '../Components/Progress/Progress';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SlNote } from 'react-icons/sl';

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
    li {
        position: relative;
        margin-bottom: 2rem;
        border-bottom: 3px solid var(--primary-100);
        padding: 2rem;
        width: 100%;
        &:nth-child(odd) {
            background-color: var(--bg-100);
        }
    }
`;

const HomeTitle = styled.div`
    display: flex;
    justify-content: center;
    & > h3 {
        font-size: 1.15rem;
        color: var(--accent-200);
    }
    & > a {
        position: absolute;
        right: 1%;
        top: 1%;
        color: var(--accent-100);
        background-color: var(--primary-200);
        padding: 0.5rem;
        border-radius: 8px;
        font-size: 0.75rem;
        text-decoration: none;
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

export default function Home() {
    const [title, setTitle] = useRecoilState(titleState);
    const setDate = useSetRecoilState(dateState);
    const end = useRecoilValue(endDateState);
    const [complete, setComplete] = useRecoilState(completeState);
    const [fail, setFail] = useRecoilState(failState);
    const setList = useSetRecoilState(listState);
    const setFailModal = useSetRecoilState(failModalState);

    // handle user name
    const { register, setValue, handleSubmit } = useForm();
    const [user, setUser] = useRecoilState(userNameState);
    const handleUserName = (data) => {
        setUser((prev) => {
            const newUser = { ...prev };
            newUser.name = data.user;
            newUser.submitted = true;
            return newUser;
        });
        setValue('user', '');
    };

    // handle complete
    const handleComplete = (itemIndex) => {
        if (complete[itemIndex].count < 65) {
            setComplete((prev) => {
                const newComplete = prev.map((item) => {
                    return { ...item };
                });
                newComplete[itemIndex].count++;
                return newComplete;
            });
            setList((prev) => {
                const newList = [...prev];
                if (newList.length > 0 && newList[itemIndex].length > 1) {
                    newList[itemIndex] = newList[itemIndex].slice(1);
                }
                return newList;
            });
        } else if (complete[itemIndex].count === 65) {
            setComplete((prev) => {
                const newComplete = prev.map((item) => {
                    return { ...item };
                });
                newComplete[itemIndex].count++;
                return newComplete;
            });
            setList((prev) => {
                const newList = [...prev];
                if (newList.length > 0 && newList[itemIndex].length > 1) {
                    newList[itemIndex] = newList[itemIndex].slice(1);
                }
                return newList;
            });
            alert(`${title[itemIndex]} Project complete. Congratulation!`);
        } else {
            return;
        }
    };
    // handle fail
    const setFailTitle = useSetRecoilState(failTitleState);
    const handleFail = (itemIndex) => {
        if (fail[itemIndex].count < 2) {
            setFail((prev) => {
                const newFail = prev.map((item) => {
                    return { ...item };
                });
                newFail[itemIndex].count++;
                return newFail;
            });
            setList((prev) => {
                const newList = [...prev];
                if (newList.length > 0 && newList[itemIndex].length > 1) {
                    newList[itemIndex] = newList[itemIndex].slice(1);
                }
                return newList;
            });
        } else if (fail[itemIndex].count === 2) {
            setFailTitle(title[itemIndex].value);
            setTitle((prev) => {
                const newTitle = prev.map((item) => {
                    return { ...item };
                });
                newTitle[itemIndex] = {
                    id: itemIndex,
                    value: '',
                    isActive: false,
                    submitted: false,
                };
                return newTitle;
            });
            setComplete((prev) => {
                const newComplete = prev.map((item) => {
                    return { ...item };
                });
                newComplete[itemIndex] = {
                    id: itemIndex,
                    value: '',
                    submitted: false,
                    count: 0,
                };
                return newComplete;
            });
            setFail((prev) => {
                const newFail = prev.map((item) => {
                    return { ...item };
                });
                newFail[itemIndex] = {
                    id: itemIndex,
                    value: '',
                    submitted: false,
                    count: 0,
                };
                return newFail;
            });
            setList((prev) => {
                const newList = [...prev];
                newList[itemIndex] = Array.from({ length: 66 }, (_, index) => ({
                    id: index,
                    value: index + 1 + '일차',
                }));
                return newList;
            });
            setDate((prev) => {
                const newDate = prev.map((item) => {
                    return { ...item };
                });
                newDate[itemIndex] = {
                    id: itemIndex,
                    start: '',
                    submitted: false,
                };
                return newDate;
            });
            setFailModal(true);
        } else {
            return;
        }
    };

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
                {title.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <HomeTitle>
                                <h3>
                                    {title[index].value === ''
                                        ? 'Empty'
                                        : title[index].value}
                                </h3>
                                <Link to={`/habit/${index}`}>Go</Link>
                            </HomeTitle>
                            <HomeProgress>
                                <ProgressBarBack>
                                    <ProgressBar
                                        style={{
                                            width: `${
                                                (complete[index].count / 66) *
                                                100
                                            }%`,
                                        }}
                                    />
                                </ProgressBarBack>
                            </HomeProgress>
                            <HomeFigure>
                                <span>
                                    {end[index] === undefined
                                        ? 'Empty'
                                        : `${end[index]} End`}
                                </span>
                                <span>
                                    {Math.floor(
                                        (complete[index].count / 66) * 100
                                    )}
                                    %
                                </span>
                            </HomeFigure>
                            <HomeButtons>
                                <button
                                    onClick={() => {
                                        handleComplete(index);
                                    }}
                                >
                                    Complete ({complete[index].count})
                                </button>
                                <button
                                    onClick={() => {
                                        handleFail(index);
                                    }}
                                    style={{
                                        backgroundColor:
                                            fail[index].count === 2
                                                ? '#FF4D4D'
                                                : '#61398f',
                                    }}
                                >
                                    Fail ({fail[index].count})
                                </button>
                            </HomeButtons>
                        </li>
                    );
                })}
            </HomeItemWrapper>
        </PageWrapper>
    );
}
