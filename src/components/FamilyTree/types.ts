export interface FamilyMember {
    id: string;
    parentId: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    deathDate: string;
    picture: string;
    relationship: string;
    children: any[] | FamilyMember[];
}

export enum FamilyRelationship {
    Child = 'CHILD',
    Sibling = 'SIBLING',
}
