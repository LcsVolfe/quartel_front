import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CustomDialog = ({ open, setOpen, contentText, title, onAccept, onDecline }) => {
    // const [open, setOpen] = useState(isOpen);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (type) => {
        switch (type) {
            case 0:
                if(!onAccept) break;
                onAccept(true);
                break;
            case 1:
                if(!onDecline) break;
                onDecline();
                break;

            default:
                break;
        }
        setOpen(false);
    };

    return (
        <div>
            {/*<Button onClick={handleClickOpen}>*/}
            {/*    Open alert dialog*/}
            {/*</Button>*/}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                {title && <DialogTitle>{title}</DialogTitle>}
                {contentText && <DialogContent>
                    <DialogContentText>{contentText}</DialogContentText>
                </DialogContent>}
                <DialogActions>
                    <Button onClick={() => handleClose(1)}>
                        Cancelar
                    </Button>
                    <Button onClick={() => handleClose(0)}autoFocus>
                        Aceitar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomDialog;