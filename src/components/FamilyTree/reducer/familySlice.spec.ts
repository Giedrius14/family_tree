import familyReducer, { addMember, FamilyTreeState, removeMember, updateMember, } from './familyReducer';

describe('family reducer', () => {
    const initialState: FamilyTreeState = {
        members: [],
    };
    it('should handle initial state', () => {
        expect(familyReducer(undefined, {type: 'unknown'})).toEqual({
            value: 0,
            status: 'idle',
        });
    });

    it('should handle addMember', () => {
        const actual = familyReducer(initialState, addMember({} as any));
        expect(actual.members).toEqual(4);
    });

    it('should handle removeMember', () => {
        const actual = familyReducer(initialState, removeMember({} as any));
        expect(actual.members).toEqual(2);
    });

    it('should handle updateMember', () => {
        const actual = familyReducer(initialState, updateMember({} as any));
        expect(actual.members).toEqual(5);
    });
});
