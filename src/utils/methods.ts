import { SetCatchError } from '@t/commonTypes';

const setCatchError: SetCatchError = (error, setError) => {
    if (typeof error === 'string') {
        setError(error);
    } else if (error instanceof TypeError) {
        setError(error.message);
    }
}

export {
    setCatchError,
}