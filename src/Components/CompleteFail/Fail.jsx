import { FormContents, FormText, FormWrapper } from '../Title/Title';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
// icons
import { SlNote } from 'react-icons/sl';
import { FaPlus } from 'react-icons/fa';
import { styled } from 'styled-components';
import { failState } from '../../data/habitData';

const FailWrapper = styled(FormWrapper)`
    margin-bottom: var(--margin-large);
`;

const CompleteText = styled(FormText)``;

const CompleteForm = styled(FormContents)``;

export default function Fail({ habitNumber }) {
    const { register, handleSubmit, setValue } = useForm();
    const [fail, setFail] = useRecoilState(failState);

    const getValue = (data) => {
        setFail((prev) => {
            const newFail = prev.map((item) => {
                return { ...item };
            });
            newFail[habitNumber].value = data.fail;
            newFail[habitNumber].submitted = true;
            return newFail;
        });
        setValue('fail', '');
    };

    return (
        <FailWrapper onSubmit={handleSubmit(getValue)}>
            <CompleteText
                style={{
                    display: fail[habitNumber].submitted ? 'flex' : 'none',
                }}
            >
                <span>{fail[habitNumber].value}</span>
                <button
                    onClick={() => {
                        setFail((prev) => {
                            const newFail = prev.map((item) => {
                                return { ...item };
                            });
                            newFail[habitNumber].submitted = false;
                            return newFail;
                        });
                    }}
                >
                    <SlNote />
                </button>
            </CompleteText>
            <CompleteForm
                style={{
                    display: fail[habitNumber].submitted ? 'none' : 'flex',
                }}
            >
                <input
                    {...register('fail', { required: true, maxLength: 25 })}
                />
                <button>
                    <FaPlus />
                </button>
            </CompleteForm>
        </FailWrapper>
    );
}
