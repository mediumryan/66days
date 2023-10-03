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

export const FormContents = styled.div`
    input {
    }
    button {
    }
`;

export default function Title() {
    return (
        <FormWrapper>
            <FormContents>
                <input />
                <button>submit</button>
            </FormContents>
        </FormWrapper>
    );
}
