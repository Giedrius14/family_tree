export interface FamilyMember {
    id: number;
    parent: number;
    firstName: string;
    lastName: string;
    age: number;
    avatar: string;
    children: FamilyMember[];
}
