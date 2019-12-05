export const CONNECT = 'CONNECT';
export const START_SIMPLE = 'START_SIMPLE';
export const END_SIMPLE = 'END_SIMPLE';
export const START_SECURE = 'START_SECURE';
export const END_SECURE = 'END_SECURE';
export const SAVE_KEY = 'SAVE_KEY';


interface connect {
    type: typeof CONNECT,
    username: string
}

interface startSimpleChat {
    type: typeof START_SIMPLE,
}


interface endSimpleChat {
    type: typeof END_SIMPLE,
}

interface startSecureChat {
    type: typeof START_SECURE,
}


interface endSecureChat {
    type: typeof END_SECURE,
}

interface saveFriendKey {
    type: typeof SAVE_KEY,
    key
}

export type ChatActionTypes =
    connect
    | startSimpleChat
    | endSimpleChat
    | startSecureChat
    | endSecureChat
    | saveFriendKey