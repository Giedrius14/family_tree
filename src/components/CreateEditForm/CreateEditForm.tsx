import React, { useEffect, useState } from 'react';
import styles from './CreateEditForm.module.css';
import { useAppDispatch } from '../../app/hooks';
import { addMember, updateMember } from '../FamilyTree/reducer/familyReducer';
import { FamilyMember } from '../FamilyTree/types';

const CreateEditForm = ({selectedMember, isEditMode, handleClose}: {selectedMember: FamilyMember, isEditMode: boolean, handleClose: any}) => {
    const [formData, setFormData] = useState({parent: '', firstName: '', lastName: '', birthDate: '', deathDate: '', picture: ''} as any as FamilyMember);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isEditMode) {
            setFormData({...selectedMember});
        }
    }, [selectedMember, isEditMode]);

    const onChangeHandler = (event: any) => {
        let {name, type, value, checked} = event.target;
        let data = type === 'checkbox' ? checked : value;

        console.log('change', name, data);
        setFormData({...formData, ...{[name]: data}});
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        if (isEditMode) {
            dispatch(updateMember({formData, selectedMember}));
        }
        else {
            dispatch(addMember({formData, selectedMember}));
        }

        console.log('event', formData, event);
        handleClose();
    };

    return (
        <div className={styles.CreateEditForm} data-testid="CreateEditForm">
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={onChangeHandler}
                    />
                </label>
                <br/>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={onChangeHandler}
                    />
                </label>
                <br/>
                <label>
                    Birth Date:
                    <input
                        type="number"
                        name="birthDate"
                        placeholder="Enter your last name"
                        value={formData.birthDate}
                        onChange={onChangeHandler}
                    />
                </label>
                <br/>
                <label>
                    Death Date:
                    <input
                        type="number"
                        name="deathDate"
                        placeholder="Enter your last name"
                        value={formData.deathDate}
                        onChange={onChangeHandler}
                    />
                </label>
                <br/>
                <label>
                    Picture:
                    <input
                        type="text"
                        name="picture"
                        placeholder="Enter your last name"
                        value={formData.picture}
                        onChange={onChangeHandler}
                    />
                </label>
                <br/>
                {/*<br/>*/}
                {/*Gender :<label>Male</label>*/}
                {/*<input*/}
                {/*    type="radio"*/}
                {/*    name="gender"*/}
                {/*    value="male"*/}
                {/*    checked={formData.gender === 'male'}*/}
                {/*    onChange={onChangeHandler}*/}
                {/*/>*/}
                {/*<label>Female</label>*/}
                {/*<input*/}
                {/*    type="radio"*/}
                {/*    name="gender"*/}
                {/*    value="female"*/}
                {/*    checked={formData.gender === 'female'}*/}
                {/*    onChange={onChangeHandler}*/}
                {/*/>*/}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default CreateEditForm;
