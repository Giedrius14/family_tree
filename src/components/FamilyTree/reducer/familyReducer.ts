import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { FamilyMember } from '../types';

export interface FamilyTreeState {
    members: Array<FamilyMember>;
}

const initialState: FamilyTreeState = {
    members: [
        {
            id: '1',
            firstName: 'firstName',
            lastName: 'lastName',
            age: 99,
            parent: 0,
            picture: '',
            children: [
                {
                    id: '2',
                    firstName: 'firstName2',
                    lastName: 'lastName2',
                    age: 20,
                    picture: '',
                    parent: 1,
                    children: []
                },
                {
                    id: '3',
                    firstName: 'firstName3',
                    lastName: 'lastName3',
                    age: 20,
                    picture: '',
                    parent: 1,
                    children: []
                }
            ]
        }

    ],
};

const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
};

const familySlice = createSlice({
    name: 'family',
    initialState,
    reducers: {
        addMember: (state, {payload}: PayloadAction<{formData: any, selectedMember: FamilyMember}>) => {
            state.members.push({...payload.formData, id: uniqueId(), children: []});
        },
        removeMember: (state, {payload}: PayloadAction<FamilyMember>) => {
            state.members = state.members.filter((member: FamilyMember) => member.id !== payload.id);
        },
        updateMember: (state, {payload}: PayloadAction<{formData: any, selectedMember: FamilyMember}>) => {
            state.members = state.members.map((member: FamilyMember) => {
                if (member.id !== payload.selectedMember.id) {
                    return member;
                }

                return {
                    ...member,
                    ...payload.formData
                };
            });
        },
    },
});

export const {addMember, removeMember, updateMember} = familySlice.actions;
export const selectFamilyMembers = (state: RootState) => state.family.members;
export default familySlice.reducer;
