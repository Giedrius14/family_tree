import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { FamilyMember, FamilyRelationship } from '../types';

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
            relationship: 'CHILD',
            children: [
                '2',
                '3'
            ]
        },
        '2': {
            id: '2',
            firstName: 'firstName2',
            lastName: 'lastName2',
            birthDate: '1900-08-08',
            deathDate: '',
            picture: '',
            parentId: '1',
            relationship: '',
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
            relationship: '',
            children: []
        },
        ku01lv64c1t8eqmf2qn: {
            firstName: 'Giedrius',
            lastName: '',
            birthDate: '',
            deathDate: '',
            picture: '',
            id: 'ku01lv64c1t8eqmf2qn',
            children: [],
            relationship: '',
            parentId: '1'
        },
        ku01lzmaqbw55qzpvso: {
            firstName: 'firstName333333',
            lastName: '',
            birthDate: '',
            deathDate: '',
            picture: '',
            id: 'ku01lzmaqbw55qzpvso',
            children: [],
            relationship: '',
            parentId: '3'
        },
        ku01m3twxw4cicq4tys: {
            firstName: '',
            lastName: '12',
            birthDate: '',
            deathDate: '',
            picture: '',
            id: 'ku01m3twxw4cicq4tys',
            children: [],
            relationship: '',
            parentId: 'ku01lzmaqbw55qzpvso'
        },
        ku01m8gzk79yu2z9vsq: {
            firstName: 'Giedrius',
            lastName: '',
            birthDate: '',
            deathDate: '',
            picture: '',
            id: 'ku01m8gzk79yu2z9vsq',
            children: [],
            relationship: '',
            parentId: '3'
        },
        ku01mc4b0pb9aoue31qd: {
            firstName: 'firstName333333',
            lastName: '',
            birthDate: '',
            deathDate: '',
            picture: '',
            id: 'ku01mc4b0pb9aoue31qd',
            children: [],
            relationship: '',
            parentId: '3'
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
            const parentId = formData.relationship === FamilyRelationship.Sibling ? state.members[selectedMember.parentId]?.id || '' : selectedMember.id;

            const newMember = {
                ...formData,
                id: uniqueId(),
                children: [],
                parentId
            };

            state.members[newMember.id] = newMember;
        },
        removeMember: (state, {payload}: PayloadAction<FamilyMember>) => {
            delete state.members[payload.id];
        },
        updateMember: (state, {payload: {formData, selectedMember}}: PayloadAction<FamilyAction>) => {
            const parentId = formData.relationship === FamilyRelationship.Sibling ? state.members[selectedMember.parentId].parentId : selectedMember.parentId || '';

            state.members[selectedMember.id] = {
                ...state.members[selectedMember.id],
                ...formData,
                parentId
            };
        },
    },
});

const createDataTree = (dataset: FamilyMember[]): FamilyMember[] => {
    const hashTable = Object.create(null);
    dataset.forEach((member: any) => hashTable[member.id] = {...member, children: []});
    const dataTree = [] as FamilyMember[];
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
export const selectMemberById = (id: string) => (state: RootState) => state.family.members[id];
export const selectFamilyMembers = (state: RootState) => createDataTree(Object.values(state.family.members));
export default familySlice.reducer;
