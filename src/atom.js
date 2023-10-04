import { atom } from 'recoil';

export const titleSubmitted = atom({
    key: 'title_submitted',
    default: false,
});

export const titleState = atom({
    key: 'title_state',
    default: '',
});

export const completeSubmitted = atom({
    key: 'complete_submitted',
    default: false,
});

export const completeState = atom({
    key: 'complete_state',
    default: '',
});

export const failSubmitted = atom({
    key: 'fail_submitted',
    default: false,
});

export const failState = atom({
    key: 'fail_state',
    default: '',
});
