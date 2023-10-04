import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const titleSubmitted = atom({
    key: 'title_submitted',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const titleState = atom({
    key: 'title_state',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const completeSubmitted = atom({
    key: 'complete_submitted',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const completeState = atom({
    key: 'complete_state',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

export const failSubmitted = atom({
    key: 'fail_submitted',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const failState = atom({
    key: 'fail_state',
    default: '',
    effects_UNSTABLE: [persistAtom],
});
