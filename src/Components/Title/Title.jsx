import { styled } from 'styled-components';
import { titleState } from '../../data/habitData';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';
// icons
import { SlNote } from 'react-icons/sl';

export const ItemSectionWrapper = styled.div`
    position: relative;
    background-color: var(--bg-200);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 1rem 2rem;
`;

export const ItemContent = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        font-size: 1.05rem;
        font-weight: 700;
    }
    svg {
        position: absolute;
        right: 4px;
        color: var(--primary-200);
    }
`;

export const AddToItem = styled.button`
    font-size: 1.05rem;
    background-color: var(--primary-200);
    color: var(--accent-100);
    padding: 0.5rem 1rem;
    border-radius: 10px;
`;

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
