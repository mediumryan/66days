import { FormContents, FormText, FormWrapper } from '../Title/Title';

export default function Complete() {
    return (
        <FormWrapper>
            <FormText>
                <span>Complete</span>
                <button>rename</button>
            </FormText>
            <FormContents>
                <input />
                <button>submit</button>
            </FormContents>
        </FormWrapper>
    );
}
