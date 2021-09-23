import React, { useState } from 'react';
import { FamilyMember } from './types';
import styles from './FamilyTree.module.scss';
import { Drawer, Fab } from '@mui/material';
import { Create, PersonAdd, PersonRemove } from '@mui/icons-material';

const FamilyTree = (props: {editMode?: boolean}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (isOpen: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsDrawerOpen(!isDrawerOpen);
    };

    const renderMemberButtons = (memberOfFamily: any): any => {
        return (
            <div>
                <Fab onClick={toggleDrawer(true)} className={styles.miniFab}> <PersonAdd fontSize="small"/></Fab>
                <Fab onClick={toggleDrawer(true)} className={styles.miniFab}> <Create fontSize="small"/></Fab>
                <Fab onClick={toggleDrawer(true)} className={styles.miniFab}> <PersonRemove fontSize="small"/></Fab>
            </div>
        );
    };

    const renderMembers = (members: FamilyMember[]) =>
        (
            <ul>
                {
                    members.map((member: FamilyMember) =>
                        (
                            <li key={member.id}>
                                <div className={styles.personContainer}>
                                    <div className={styles.personDetails}>
                                        <div className={styles.personAvatar}>Avatar</div>
                                        <div className={styles.personName}>
                                            <div>{member.firstName}</div>
                                            <div>{member.lastName}</div>
                                        </div>
                                    </div>
                                    <div className={styles.actionButtons}>
                                        {props.editMode && <div> {renderMemberButtons(member)}</div>}
                                    </div>
                                </div>
                                {renderMembers(member.children)}
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
                    parent: 1,
                    children: []
                },
                {
                    id: 3,
                    firstName: 'firstName3',
                    lastName: 'lastName3',
                    age: 20,
                    avatar: '',
                    parent: 1,
                    children: []
                }
            ]
        }

    ] as FamilyMember[];

    const familyMembers = initialState;

    return (
        <div>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                {<div>TODO</div>}
            </Drawer>
            {renderMembers(familyMembers)}
        </div>
    );
};

export default FamilyTree;
