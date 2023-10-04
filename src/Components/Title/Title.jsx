import { styled } from 'styled-components';

export const FormWrapper = styled.form`
    background-color: aliceblue;
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FormText = styled.div`
    span {
        font-size: var(--font-size-medium);
        color: blue;
    }
    button {
        font-size: var(--font-size-medium);
        color: white;
    }
`;

export const FormContents = styled.div`
    input {
    }
    button {
    }
`;

export default function Title() {
    return (
        <FormWrapper>
            <FormText>
                <span>Title</span>
                <button>rename</button>
            </FormText>
            <FormContents>
                <input />
                <button>submit</button>
            </FormContents>
        </FormWrapper>
    );
}
