import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import familyReducer from '../components/FamilyTree/reducer/familyReducer';

export const store = configureStore({
    reducer: {
        family: familyReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
