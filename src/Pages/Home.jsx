import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PageWrapper } from './Habit';
import {
    completePercentState,
    completeState,
    endDateState,
    failState,
    listState,
    titleState,
} from '../data/habitData';
import { styled } from 'styled-components';
import { ProgressBarBack, ProgressBar } from '../Components/Progress/Progress';
import { Link } from 'react-router-dom';

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
        margin-bottom: 2rem;
        border-bottom: 3px solid var(--primary-100);
        padding: 2rem;
        width: 100%;
    }
`;

const HomeTitle = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    & > h3 {
        font-size: 1.5rem;
        color: var(--accent-200);
    }
    & > a {
        position: absolute;
        right: 2%;
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
    const title = useRecoilValue(titleState);
    const end = useRecoilValue(endDateState);
    const completePer = useRecoilValue(completePercentState);
    const [complete, setComplete] = useRecoilState(completeState);
    const [fail, setFail] = useRecoilState(failState);
    const setList = useSetRecoilState(listState);

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
            alert(`${title[itemIndex]} Project fail.`);
        } else {
            return;
        }
    };

    return (
        <PageWrapper>
            <HomeItemWrapper>
                {title.map((_, index) => {
                    return (
                        <li>
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
                                    <ProgressBar per={completePer[index]} />
                                </ProgressBarBack>
                            </HomeProgress>
                            <HomeFigure>
                                <span>
                                    {end[index] === undefined
                                        ? 'Empty'
                                        : `${end[index]} End`}
                                </span>
                                <span>{completePer[index]}%</span>
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
