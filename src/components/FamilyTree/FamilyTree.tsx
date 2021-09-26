import React, { useEffect, useState } from 'react';
import { FamilyMember } from './types';
import styles from './FamilyTree.module.scss';
import { Drawer, Fab } from '@mui/material';
import { Create, PersonAdd, PersonRemove } from '@mui/icons-material';
import CreateEditForm from '../CreateEditForm/CreateEditForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMember, removeMember, selectFamilyMembers } from './reducer/familyReducer';
import PersonDetails from '../PersonDetails/PersonDetails';
import DeleteDialog from '../DeleteDialog/DeleteDialog';

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
                    relationship: '',
                    firstName: 'Root',
                    lastName: '',
                    birthDate: '',
                    deathDate: '',
                    picture: '',
                    children: [],
                },
                selectedMember: {} as FamilyMember
            }));
        }
    }, [dispatch, familyMembers]);

    const toggleDrawer = (member: FamilyMember, editMode?: boolean) => (event: any) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsEditMode(!!editMode);
        setSelectedMember(member);
        setIsDrawerOpen(!isDrawerOpen);
    };

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const openDeleteDialog = (familyMember: FamilyMember) => (event: any) => {
        setSelectedMember(familyMember);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const deletePerson = (familyMember: FamilyMember) => {
        dispatch(removeMember(familyMember));
        handleCloseDialog();
    };

    const renderMemberButtons = (familyMember: FamilyMember): any =>
        (
            <>
                <Fab onClick={toggleDrawer(familyMember)} className={styles.miniFab}> <PersonAdd fontSize="small"/></Fab>
                <Fab onClick={toggleDrawer(familyMember, true)} className={styles.miniFab}> <Create fontSize="small"/></Fab>
                <Fab onClick={openDeleteDialog(familyMember)} className={styles.miniFab}> <PersonRemove fontSize="small"/></Fab>
            </>
        );

    const renderMembers = (members: FamilyMember[]) =>
        (
            <ul>
                {
                    members.map((member: FamilyMember) =>
                        (
                            <li key={member.id}>
                                <div className={styles.personContainer}>
                                    <PersonDetails member={member}/>
                                    <div className={styles.actionButtons}>
                                        {editingView && <div> {renderMemberButtons(member)}</div>}
                                    </div>
                                </div>
                                {!!member.children.length && renderMembers(member.children)}
                            </li>
                        ))
                }
            </ul>
        );

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
            <DeleteDialog open={isDialogOpen} onClose={handleCloseDialog} onSubmit={() => deletePerson(selectedMember)}/>
        </div>
    );
};

export default FamilyTree;
