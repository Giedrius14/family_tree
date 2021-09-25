import { configureStore } from '@reduxjs/toolkit';
import familyReducer from '../components/FamilyTree/reducer/familyReducer';

export const store = configureStore({
    reducer: {
        family: familyReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
