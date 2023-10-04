import { styled } from 'styled-components';
import { titleState, titleSubmitted } from '../../atom';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
// icons
import { SlNote } from 'react-icons/sl';
import { FaPlus } from 'react-icons/fa';

export const FormWrapper = styled.form`
    background-color: var(--bg-200);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: var(--padding-double-medium);
`;

export const FormText = styled.div`
    position: relative;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    display: ${(props) => (props.isTitle ? 'flex' : 'none')};
    span {
        font-size: var(--font-size-medium);
        color: var(--text-200);
    }
    button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        font-size: var(--font-size-medium);
        color: var(--primary-100);
        transition: 300ms all;
        &:hover {
            opacity: 0.5;
        }
    }
`;

export const FormContents = styled.div`
    display: ${(props) => (props.isTitle ? 'none' : 'flex')};
    align-items: center;
    input {
        padding: var(--padding-double-small);
        font-size: var(--font-size-small);
        border: 1px solid var(--primary-100);
        border-radius: 10px;
    }
    button {
        padding: var(--padding-double-small);
        font-size: var(--font-size-small);
        margin-left: var(--margin-small);
        transition: 300ms all;
        &:hover {
            opacity: 0.5;
            transform: scale(1.05);
        }
    }
`;

export default function Title() {
    const [isTitle, setIsTitle] = useRecoilState(titleSubmitted);
    const { register, handleSubmit, setValue } = useForm();
    const [title, setTitle] = useRecoilState(titleState);

    const getValue = (data) => {
        setTitle(data.title);
        setValue('title', '');
        setIsTitle(true);
    };

    return (
        <FormWrapper onSubmit={handleSubmit(getValue)}>
            <FormText isTitle={isTitle}>
                <span>{title}</span>
                <button
                    onClick={() => {
                        setIsTitle(false);
                    }}
                >
                    <SlNote />
                </button>
            </FormText>
            <FormContents isTitle={isTitle}>
                <input {...register('title', { required: true })} />
                <button>
                    <FaPlus />
                </button>
            </FormContents>
        </FormWrapper>
    );
}
