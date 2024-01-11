import defaultSettings from '../settings.json';
import {createStore} from "redux";

export interface GlobalState {
    settings?: typeof defaultSettings;
    userInfo?: {
        id?: number;
        name?: string;
        avatar?: string;
        devices?: number[];
        permissions: Record<string, string[]>;
    };
    userLoading?: boolean;

    unit?: string[];
    factor?: number[];
    adder?: number[];
}

const initialState: GlobalState = {
    settings: defaultSettings,
    userInfo: {
        permissions: {},
    },

    unit: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'],
    factor: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    adder: [0, 0, 0, 0, 0, 0, 0, 0, 0],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'update-settings': {
            const {settings} = action.payload;
            return {
                ...state,
                settings,
            };
        }
        case 'update-userInfo': {
            const {userInfo = initialState.userInfo, userLoading} = action.payload;
            return {
                ...state,
                userLoading,
                userInfo,
            };
        }
        case 'update-unit': {
            const {unit = initialState.unit} = action.payload;
            return {
                ...state,
                unit,
            };
        }
        case 'update-factor': {
            const {factor = initialState.factor} = action.payload;
            return {
                ...state,
                factor,
            };
        }
        case 'update-adder': {
            const {adder = initialState.adder} = action.payload;
            return {
                ...state,
                adder,
            };
        }
        default:
            return state;
    }
}
const store = createStore(reducer);
export default store;


