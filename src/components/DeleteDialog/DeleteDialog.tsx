import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DeleteDialog = (props: {open: boolean, onClose: () => void, onSubmit: () => void}) =>
    <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {'Do you want to delete?'}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Do you want to delete family member with its relationships ?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Disagree</Button>
            <Button onClick={props.onSubmit}
                    autoFocus
                    color="primary"
                    variant="contained">Agree</Button>
        </DialogActions>
    </Dialog>;

export default DeleteDialog;
