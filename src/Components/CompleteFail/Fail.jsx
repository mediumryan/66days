import { FormContents, FormText, FormWrapper } from '../Title/Title';

export default function Fail() {
    return (
        <FormWrapper>
            <FormText>
                <span>Fail</span>
                <button>rename</button>
            </FormText>
            <FormContents>
                <input />
                <button>submit</button>
            </FormContents>
        </FormWrapper>
    );
}
