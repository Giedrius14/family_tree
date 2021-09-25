export interface FamilyMember {
    id: string;
    parentId: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    deathDate: string;
    picture: string;
    children: any[] | FamilyMember[];
}
