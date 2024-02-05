import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { completeState, dateState, endDateState } from '../../data/habitData';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
// icons
import { SlNote } from 'react-icons/sl';
import { AddToItem, ItemContent, ItemSectionWrapper } from '../Title/Title';

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

export const ProgressBarBack = styled.div`
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

export default function Progress({ habitNumber }) {
    const complete = useRecoilValue(completeState);
    const [date, setDate] = useRecoilState(dateState);
    const end = useRecoilValue(endDateState);
    const { register, handleSubmit } = useForm();
    const getStartDate = (data) => {
        setDate((prev) => {
            const newDate = prev.map((item) => {
                return { ...item };
            });
            newDate[habitNumber].start = data.date;
            newDate[habitNumber].submitted = true;
            return newDate;
        });
    };

    const handleDate = () => {
        Swal.fire({
            title: 'Start Date',
            input: 'date',
            didOpen: () => {
                const today = new Date().toISOString();
                Swal.getInput().min = today.split('T')[0];
            },
        }).then((result) => {
            if (result.value) {
                console.log(result);
            }
        });
    };

    return (
        <ItemSectionWrapper>
            <Per>{Math.floor((complete[habitNumber].count / 66) * 100)}%</Per>
            <CompleteCount>{complete[habitNumber].count} / 66</CompleteCount>
            <ProgressBarBack>
                <ProgressBar
                    style={{
                        width: `${(complete[habitNumber].count / 66) * 100}%`,
                    }}
                />
            </ProgressBarBack>
            {date[habitNumber].submitted ? (
                <ItemContent>
                    <p>{date[habitNumber].value}</p>
                    <SlNote onClick={handleDate} />
                </ItemContent>
            ) : (
                <AddToItem onClick={handleDate}>Add to Start date</AddToItem>
            )}
        </ItemSectionWrapper>
        // <ProgressWrapper>
        //     <Per>{completePercent[habitNumber]}%</Per>
        //     <CompleteCount>{complete[habitNumber].count} / 66</CompleteCount>
        //     <ProgressBarBack>
        //         <ProgressBar
        //             style={{ width: `${completePercent[habitNumber]}%` }}
        //         />
        //     </ProgressBarBack>
        //     <DateValue>
        //         {date[habitNumber].submitted === false ? (
        //             <form onSubmit={handleSubmit(getStartDate)}>
        //                 <label>Start : </label>
        //                 <input
        //                     type="date"
        //                     {...register('date', { required: true })}
        //                 />
        //                 <button>
        //                     <FaPlus />
        //                 </button>
        //             </form>
        //         ) : null}

        //         {date[habitNumber].submitted ? (
        //             <StartEnd>
        //                 <Start>
        //                     <span>Start</span>
        //                     <span>{date[habitNumber].start}</span>
        //                 </Start>
        //                 <End>
        //                     <span>End</span>
        //                     <span>{end[habitNumber]}</span>
        //                 </End>
        //                 <button
        //                     onClick={() => {
        //                         setDate((prev) => {
        //                             const newDate = prev.map((item) => {
        //                                 return { ...item };
        //                             });
        //                             newDate[habitNumber].submitted = false;
        //                             return newDate;
        //                         });
        //                     }}
        //                 >
        //                     <SlNote />
        //                 </button>
        //             </StartEnd>
        //         ) : null}
        //     </DateValue>
        // </ProgressWrapper>
    );
}
