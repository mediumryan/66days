import { completeState, completeSubmitted } from '../../data/habitData';
import { FormContents, FormText, FormWrapper } from '../Title/Title';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
// icons
import { SlNote } from 'react-icons/sl';
import { FaPlus } from 'react-icons/fa';
import { styled } from 'styled-components';

const CompleteText = styled(FormText)``;

const CompleteForm = styled(FormContents)``;

export default function Complete() {
    const [isComplete, setIsComplete] = useRecoilState(completeSubmitted);
    const { register, handleSubmit, setValue } = useForm();
    const [complete, setComplete] = useRecoilState(completeState);

    const getValue = (data) => {
        setComplete(data.complete);
        setValue('complete', '');
        setIsComplete(true);
    };

    return (
        <FormWrapper onSubmit={handleSubmit(getValue)}>
            <CompleteText
                isComplete={isComplete}
                style={{ display: isComplete ? 'flex' : 'none' }}
            >
                <span>{complete}</span>
                <button
                    onClick={() => {
                        setIsComplete(false);
                    }}
                >
                    <SlNote />
                </button>
            </CompleteText>
            <CompleteForm
                isComplete={isComplete}
                style={{ display: isComplete ? 'none' : 'flex' }}
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
