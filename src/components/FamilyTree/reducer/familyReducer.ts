import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { FamilyMember } from '../types';

export interface FamilyTreeState {
    members: {[name: string]: FamilyMember};
}

interface FamilyAction {
    formData: FamilyMember | any;
    selectedMember: FamilyMember;
}

const initialState: FamilyTreeState = {
    members: {
        '1': {
            id: '1',
            firstName: 'firstName',
            lastName: 'lastName',
            birthDate: '1800-08-08',
            deathDate: '',
            parentId: '',
            picture: 'https://static.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg',
            children: ['2', '3']
        },
        '2': {
            id: '2',
            firstName: 'firstName2',
            lastName: 'lastName2',
            birthDate: '1900-08-08',
            deathDate: '',
            picture: '',
            parentId: '1',
            children: []
        },
        '3': {
            id: '3',
            firstName: 'firstName3',
            lastName: 'lastName3',
            birthDate: '1900-08-08',
            deathDate: '',
            picture: '',
            parentId: '1',
            children: []
        }
    }
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
        addMember: (state, {payload: {formData, selectedMember}}: PayloadAction<FamilyAction>) => {
            const newMember = {
                ...formData,
                id: uniqueId(),
                children: [],
                parentId: selectedMember.id || ''
            };

            state.members[newMember.id] = newMember;
        },
        removeMember: (state, {payload}: PayloadAction<FamilyMember>) => {
            delete state.members[payload.id];
        },
        updateMember: (state, {payload: {formData, selectedMember}, payload}: PayloadAction<FamilyAction>) => {
            state.members[selectedMember.id] = {
                ...state.members[selectedMember.id],
                ...formData
            };
        },
    },
});

const createDataTree = (dataset: FamilyMember[]): FamilyMember[] => {
    const hashTable = Object.create(null);
    dataset.forEach((member: any) => hashTable[member.id] = {...member, children: []});
    const dataTree = [] as any;
    dataset.forEach((member: FamilyMember) => {
        if (member.parentId) {
            hashTable[member.parentId].children.push(hashTable[member.id]);
        }
        else {
            dataTree.push(hashTable[member.id]);
        }
    });
    return dataTree;
};

export const {addMember, removeMember, updateMember} = familySlice.actions;
export const selectFamilyMembers = (state: RootState) => createDataTree(Object.values(state.family.members));
export default familySlice.reducer;
