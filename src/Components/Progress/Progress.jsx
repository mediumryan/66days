import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import {
    completeCountState,
    completePercentState,
    dateSubmitted,
    endDateState,
    startDateState,
} from '../../data/habitData';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { SlNote } from 'react-icons/sl';

const ProgressWrapper = styled.div`
    position: relative;
    background-color: var(--bg-200);
    color: var(--text-200);
    font-size: var(--font-size-micro);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-double-large);
    border-radius: 20px;
`;

const Per = styled.span`
    position: absolute;
    top: 10%;
    right: 2.5%;
    color: var(--primary-200);
`;

const CompleteCount = styled.span``;

const ProgressBarBack = styled.div`
    background-color: var(--bg-300);
    border-radius: 8px;
    width: 100%;
    height: 25px;
    overflow: hidden;
    margin: var(--margin-medium-large) 0;
`;

const ProgressBar = styled.div`
    background-color: var(--primary-200);
    width: ${(props) => props.per}%;
    height: 100%;
`;

const DateValue = styled.span`
    form {
        display: flex;
        align-items: center;
        input {
            margin: 0 var(--margin-small);
        }
    }
`;

const StartEnd = styled.div`
    position: relative;
    button {
        position: absolute;
        top: 50%;
        right: -50%;
        transform: translateY(-50%);
        font-size: var(--font-size-medium);
        color: var(--primary-100);
    }
`;

const Start = styled.div`
    margin: var(--margin-medium) 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        margin-bottom: var(--margin-small);
        color: var(--accent-200);
    }
`;

const End = styled(Start)``;

export default function Progress() {
    const completeCount = useRecoilValue(completeCountState);
    const completePercent = useRecoilValue(completePercentState);

    const [isDate, setIsDate] = useRecoilState(dateSubmitted);
    const [startDate, setStartDate] = useRecoilState(startDateState);
    const endDate = useRecoilValue(endDateState);
    const { register, handleSubmit } = useForm();
    const getStartDate = (data) => {
        setStartDate(data.date);
        setIsDate(true);
    };

    return (
        <ProgressWrapper>
            <Per>{completePercent}%</Per>
            <CompleteCount>{completeCount}/66</CompleteCount>
            <ProgressBarBack>
                <ProgressBar per={completePercent} />
            </ProgressBarBack>
            <DateValue>
                {isDate === false ? (
                    <form onSubmit={handleSubmit(getStartDate)}>
                        <label>Start : </label>
                        <input
                            type="date"
                            {...register('date', { required: true })}
                        />
                        <button>
                            <FaPlus />
                        </button>
                    </form>
                ) : null}

                {isDate ? (
                    <StartEnd>
                        <Start>
                            <span>Start</span>
                            <span>{startDate}</span>
                        </Start>
                        <End>
                            <span>End</span>
                            <span>{endDate}</span>
                        </End>
                        <button
                            onClick={() => {
                                setIsDate(false);
                            }}
                        >
                            <SlNote />
                        </button>
                    </StartEnd>
                ) : null}
            </DateValue>
        </ProgressWrapper>
    );
}
