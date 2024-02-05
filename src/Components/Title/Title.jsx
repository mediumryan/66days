import { styled } from 'styled-components';
import { titleState } from '../../data/habitData';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
// icons
import { SlNote } from 'react-icons/sl';

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
    span {
        font-size: var(--font-size-small);
        color: var(--text-200);
    }
    button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        font-size: var(--font-size-medium);
        margin-left: var(--margin-medium);
        color: var(--primary-100);
        transition: 300ms all;
        &:hover {
            opacity: 0.5;
        }
    }
`;

export const ItemSectionWrapper = styled.div`
    background-color: var(--bg-200);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: var(--padding-double-medium);
`;

export const ItemContent = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-size: 0.85rem;
        font-weight: 700;
    }
    svg {
        position: absolute;
        right: 4px;
        color: var(--primary-200);
    }
`;

export const AddToItem = styled.button``;

export const FormContents = styled.div`
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

export default function Title({ habitNumber }) {
    const [title, setTitle] = useRecoilState(titleState);

    const handleTitle = () => {
        Swal.fire({
            title: 'Habit',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setTitle((prev) => {
                    const newTitle = prev.map((item) => {
                        return { ...item };
                    });
                    newTitle[habitNumber].value = result.value;
                    newTitle[habitNumber].submitted = true;
                    return newTitle;
                });
            }
        });
    };

    return (
        <ItemSectionWrapper>
            {title[habitNumber].submitted ? (
                <ItemContent>
                    <p>{title[habitNumber].value}</p>
                    <SlNote onClick={handleTitle} />
                </ItemContent>
            ) : (
                <AddToItem onClick={handleTitle}>Add to Habit</AddToItem>
            )}
        </ItemSectionWrapper>
    );
}
