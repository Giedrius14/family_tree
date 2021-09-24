export interface FamilyMember {
    id: string;
    parent: number;
    firstName: string;
    lastName: string;
    age: number;
    picture: string;
    children: FamilyMember[];
}
