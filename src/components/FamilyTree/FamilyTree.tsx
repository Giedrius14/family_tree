import React from 'react';
import { FamilyMember } from './types';

const FamilyTree = () => {
    const renderMembers = (members: FamilyMember[]) =>
        (
            <ul>
                {
                    members.map(({id, firstName, children}: FamilyMember) =>
                        (
                            <li key={id}>
                                <div>{firstName}</div>
                                {renderMembers(children)}
                            </li>
                        ))
                }
            </ul>
        );

    const initialState = [
        {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
            age: 99,
            parent: 0,
            avatar: '',
            children: [
                {
                    id: 2,
                    firstName: 'firstName2',
                    lastName: 'lastName2',
                    age: 20,
                    avatar: '',
                    parent: 1
                },
                {
                    id: 3,
                    firstName: 'firstName3',
                    lastName: 'lastName3',
                    age: 20,
                    avatar: '',
                    parent: 1
                }
            ]
        }

    ] as FamilyMember[];

    const familyMembers = initialState;

    return (
        <div>
            {renderMembers(familyMembers)}
        </div>
    );
};

export default FamilyTree;
