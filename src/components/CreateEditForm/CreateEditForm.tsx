import React from 'react';
import styles from './CreateEditForm.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMember, selectMemberById, updateMember } from '../FamilyTree/reducer/familyReducer';
import { FamilyMember, FamilyRelationship } from '../FamilyTree/types';
import * as Yup from 'yup';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { DatePicker } from '@mui/lab/';
import PersonDetails from '../PersonDetails/PersonDetails';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    birthDate: Yup.date().required('Birth date is required'),
    deathDate: Yup.string(),
    picture: Yup.string(),
    relationship: Yup.string().required('Relationship is required'),
});

const CreateEditForm = ({selectedMember, isEditMode, handleClose}: {selectedMember: FamilyMember, isEditMode: boolean, handleClose: any}) => {
    const dispatch = useAppDispatch();
    const parent = useAppSelector(selectMemberById(selectedMember.parentId));

    const formik = useFormik({
        initialValues: (isEditMode ? {...selectedMember} :
            {
                firstName: '',
                lastName: '',
                birthDate: '',
                deathDate: '',
                picture: '',
                relationship: 'CHILD'
            }),
        validationSchema: validationSchema,
        onSubmit: (formData) => {
            if (isEditMode) {
                dispatch(updateMember({formData, selectedMember}));
            }
            else {
                dispatch(addMember({formData, selectedMember}));
            }

            handleClose();
        },
    });

    const handleCancel = () => {
        handleClose();
    };

    return (
        <div className={styles.CreateEditForm} data-testid="CreateEditForm">
            <div className={styles.parentDetails}>
                {isEditMode &&
                <div>
                    <Typography className={styles.formTitle} variant="h4" component="h4">Editing:</Typography>
                    <PersonDetails member={selectedMember}></PersonDetails>
                </div>
                }
                <div>
                    {!isEditMode ? <Typography className={styles.formTitle} variant="h4">Creating relationship to:</Typography>
                        : <Typography className={styles.formTitle} variant="subtitle1">Parent:</Typography>
                    }
                    {parent && <PersonDetails member={parent}></PersonDetails>}
                </div>
            </div>
            <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
                {isEditMode && selectedMember.parentId !== '' &&
                <FormControl fullWidth error={formik.touched.relationship && Boolean(formik.errors.relationship)}>
                    <InputLabel id="relationship-label">Relationship to {isEditMode ? 'current parent' : 'selected member'}</InputLabel>
                    <Select
                        labelId="relationship-label"
                        id="relationship"
                        value={formik.values.relationship}
                        onChange={(event: any) => formik.setFieldValue('relationship', event.target.value)}
                    >
                        <MenuItem value={FamilyRelationship.Child}>Child</MenuItem>
                        <MenuItem value={FamilyRelationship.Sibling}>Sibling</MenuItem>
                    </Select>
                    {formik.errors.relationship && <FormHelperText>{formik.errors.relationship}</FormHelperText>}
                </FormControl>
                }
                <TextField
                    id="firstName"
                    name="firstName"
                    label="FirstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                    id="lastName"
                    name="lastName"
                    label="LastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <FormControl error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}>
                    <DatePicker
                        label="Birth Date"
                        mask={'____/__/__'}
                        inputFormat="yyyy/MM/dd"
                        value={formik.values.birthDate}
                        onChange={(option: any | Date) => formik.setFieldValue('birthDate', !isNaN(Date.parse(option)) && option.toISOString().split('T')[0])}
                        renderInput={(params: any) =>
                            <TextField {...params}
                                       id="birthDate"
                                       name="birthDate"
                                       error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                            />
                        }
                    />
                    {formik.errors.birthDate && <FormHelperText>{formik.errors.birthDate}</FormHelperText>}
                </FormControl>
                <DatePicker
                    label="Death Date"
                    mask={'____/__/__'}
                    inputFormat="yyyy/MM/dd"
                    value={formik.values.deathDate}
                    onChange={(option: any | Date) => formik.setFieldValue('deathDate', !isNaN(Date.parse(option)) && option.toISOString().split('T')[0])}
                    renderInput={(params: any) =>
                        <TextField {...params}
                                   id="deathDate"
                                   name="deathDate"
                                   error={formik.touched.deathDate && Boolean(formik.errors.deathDate)}
                        />
                    }
                />
                <TextField
                    fullWidth
                    id="picture"
                    name="picture"
                    label="Picture link"
                    value={formik.values.picture}
                    onChange={formik.handleChange}
                    error={formik.touched.picture && Boolean(formik.errors.picture)}
                    helperText={formik.touched.picture && formik.errors.picture}
                />
                <div>
                    <Button color="primary" variant="contained" fullWidth type="submit">Save</Button>
                    <Button color="primary" variant="outlined" fullWidth type="button" onClick={handleCancel}>Cancel</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateEditForm;
