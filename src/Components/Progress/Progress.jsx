import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { completeState, dateState, endDateState } from '../../data/habitData';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
// icons
import { SlNote } from 'react-icons/sl';
import { AddToItem, ItemContent, ItemSectionWrapper } from '../Title/Title';

const Per = styled.span`
    position: absolute;
    top: 10%;
    right: 2.5%;
    color: var(--primary-200);
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
                setDate((prev) => {
                    const newDate = prev.map((item) => {
                        return { ...item };
                    });
                    newDate[habitNumber].start = result.value;
                    newDate[habitNumber].submitted = true;
                    return newDate;
                });
            }
        });
    };

    return (
        <ItemSectionWrapper>
            <Per>{Math.floor((complete[habitNumber].count / 66) * 100)}%</Per>
            <span>{complete[habitNumber].count} / 66</span>
            <BackProgressBar>
                <ProgressBar
                    style={{
                        width: `${(complete[habitNumber].count / 66) * 100}%`,
                    }}
                />
            </BackProgressBar>
            {date[habitNumber].submitted ? (
                <ItemContent>
                    <p style={{ fontSize: '0.75rem' }}>
                        {date[habitNumber].start} ~
                        {end[habitNumber].toISOString().split('T')[0]}
                    </p>
                    <SlNote onClick={handleDate} />
                </ItemContent>
            ) : (
                <AddToItem onClick={handleDate}>Add to Start date</AddToItem>
            )}
        </ItemSectionWrapper>
    );
}
