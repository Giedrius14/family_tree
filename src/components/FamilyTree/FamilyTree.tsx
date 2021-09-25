import React, { useEffect, useState } from 'react';
import { FamilyMember } from './types';
import styles from './FamilyTree.module.scss';
import { Drawer, Fab } from '@mui/material';
import { Create, PersonAdd, PersonRemove } from '@mui/icons-material';
import CreateEditForm from '../CreateEditForm/CreateEditForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMember, removeMember, selectFamilyMembers } from './reducer/familyReducer';

const FamilyTree = ({editingView}: {editingView?: boolean}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState({} as FamilyMember);
    const [isEditMode, setIsEditMode] = useState(false);
    const familyMembers = useAppSelector(selectFamilyMembers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!familyMembers.length) {
            dispatch(addMember({
                formData: {
                    id: '0',
                    parentId: '',
                    firstName: 'Root',
                    lastName: '',
                    birthDate: '',
                    deathDate: '',
                    picture: '',
                    children: []
                },
                selectedMember: {} as FamilyMember
            }));
        }
    }, [dispatch, familyMembers]);

    const toggleDrawer = (member: FamilyMember, editMode?: boolean) => (event: any) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        if (editMode && isEditMode !== editMode) {
            setIsEditMode(editMode);
        }

        setSelectedMember(member);
        setIsDrawerOpen(!isDrawerOpen);
    };

    const deletePerson = (familyMember: FamilyMember) => (event: any) => {
        //todo confirm delete dialog
        dispatch(removeMember(familyMember));
    };

    const renderMemberButtons = (familyMember: FamilyMember): any =>
        (
            <>
                <Fab onClick={toggleDrawer(familyMember)} className={styles.miniFab}> <PersonAdd fontSize="small"/></Fab>
                <Fab onClick={toggleDrawer(familyMember, true)} className={styles.miniFab}> <Create fontSize="small"/></Fab>
                <Fab onClick={deletePerson(familyMember)} className={styles.miniFab}> <PersonRemove fontSize="small"/></Fab>
            </>
        );

    const renderMembers = (members: FamilyMember[]) =>
        (
            <ul>
                {
                    members.map((member: FamilyMember) =>
                        (
                            <li key={member.id}>
                                {/*TODO extract to component*/}
                                <div className={styles.personContainer}>
                                    <div className={styles.personDetails}>
                                        <div className={styles.personPicture}>
                                            {member.picture && <img src={member.picture} alt="memberPicture"/>}
                                        </div>
                                        <div className={styles.personName}>
                                            <div>{member.firstName}</div>
                                            <div>{member.lastName}</div>
                                            <div>{member.birthDate} - {member.deathDate}</div>
                                        </div>
                                    </div>
                                    <div className={styles.actionButtons}>
                                        {editingView && <div> {renderMemberButtons(member)}</div>}
                                    </div>
                                </div>
                                {renderMembers(member.children)}
                            </li>
                        ))
                }
            </ul>
        );

    console.log('familyMembers', familyMembers);
    //todo nice to have zoom, transform scale
    return (
        <div className={styles.FamilyTree}>
            <div className={styles.treeContainer}>
                {renderMembers(familyMembers)}
            </div>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer({} as FamilyMember)}
                classes={{paper: styles.drawerPaper}}
            >
                {<CreateEditForm selectedMember={selectedMember}
                                 isEditMode={isEditMode}
                                 handleClose={toggleDrawer({} as FamilyMember)}
                ></CreateEditForm>}
            </Drawer>
        </div>
    );
};

export default FamilyTree;
