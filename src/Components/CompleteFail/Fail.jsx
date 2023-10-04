import { FormContents, FormText, FormWrapper } from '../Title/Title';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
// icons
import { SlNote } from 'react-icons/sl';
import { FaPlus } from 'react-icons/fa';
import { styled } from 'styled-components';
import { failState, failSubmitted } from '../../atom';

const CompleteText = styled(FormText)`
    display: ${(props) => (props.isFail ? 'flex' : 'none')};
`;

const CompleteForm = styled(FormContents)`
    display: ${(props) => (props.isFail ? 'none' : 'flex')};
`;

export default function Fail() {
    const [isFail, setIsFail] = useRecoilState(failSubmitted);
    const { register, handleSubmit, setValue } = useForm();
    const [fail, setFail] = useRecoilState(failState);

    const getValue = (data) => {
        setFail(data.fail);
        setValue('fail', '');
        setIsFail(true);
    };

    return (
        <FormWrapper onSubmit={handleSubmit(getValue)}>
            <CompleteText isFail={isFail}>
                <span>{fail}</span>
                <button
                    onClick={() => {
                        setIsFail(false);
                    }}
                >
                    <SlNote />
                </button>
            </CompleteText>
            <CompleteForm isFail={isFail}>
                <input {...register('fail', { required: true })} />
                <button>
                    <FaPlus />
                </button>
            </CompleteForm>
        </FormWrapper>
    );
}
