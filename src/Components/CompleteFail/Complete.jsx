import { completeState } from '../../data/habitData';
import { FormContents, FormText, FormWrapper } from '../Title/Title';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
// icons
import { SlNote } from 'react-icons/sl';
import { FaPlus } from 'react-icons/fa';
import { styled } from 'styled-components';

const CompleteText = styled(FormText)``;

const CompleteForm = styled(FormContents)``;

export default function Complete({ habitNumber }) {
    const { register, handleSubmit, setValue } = useForm();
    const [complete, setComplete] = useRecoilState(completeState);

    const getValue = (data) => {
        setComplete((prev) => {
            const newComplete = prev.map((item) => {
                return { ...item };
            });
            newComplete[habitNumber].value = data.complete;
            newComplete[habitNumber].submitted = true;
            return newComplete;
        });
        setValue('complete', '');
    };

    return (
        <FormWrapper onSubmit={handleSubmit(getValue)}>
            <CompleteText
                style={{
                    display: complete[habitNumber].submitted ? 'flex' : 'none',
                }}
            >
                <span>{complete[habitNumber].value}</span>
                <button
                    onClick={() => {
                        setComplete((prev) => {
                            const newComplete = prev.map((item) => {
                                return { ...item };
                            });
                            newComplete[habitNumber].submitted = false;
                            return newComplete;
                        });
                    }}
                >
                    <SlNote />
                </button>
            </CompleteText>
            <CompleteForm
                style={{
                    display: complete[habitNumber].submitted ? 'none' : 'flex',
                }}
            >
                <input
                    {...register('complete', { required: true, maxLength: 25 })}
                />
                <button>
                    <FaPlus />
                </button>
            </CompleteForm>
        </FormWrapper>
    );
}
