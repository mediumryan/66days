import { styled } from 'styled-components';

const ProgressWrapper = styled.div`
    position: relative;
    background-color: green;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
`;

const Per = styled.span`
    position: absolute;
    top: 0%;
    right: 0;
`;

const CompleteCount = styled.span``;

const ProgressBarBack = styled.div`
    background-color: white;
    width: 50%;
    height: 10px;
`;

const ProgressBar = styled.div`
    background-color: red;
    width: 20%;
    height: 10px;
`;

const ProgressBottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const FailCount = styled.span``;

const DateValue = styled.span``;

export default function Progress() {
    return (
        <ProgressWrapper>
            <Per>20%</Per>
            <CompleteCount>0/66</CompleteCount>
            <ProgressBarBack>
                <ProgressBar />
            </ProgressBarBack>
            <ProgressBottom>
                <FailCount>0/3</FailCount>
                <DateValue>2023/09/31 - 2024/01/01</DateValue>
            </ProgressBottom>
        </ProgressWrapper>
    );
}
