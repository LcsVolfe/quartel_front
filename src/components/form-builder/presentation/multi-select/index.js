import React, {useEffect, useState} from "react";
import {
    AppBar,
    Button,
    CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    makeStyles,
    TextField,
    Toolbar
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from "mui-datatables";
import CloseIcon from '@material-ui/icons/Close';
import ApiService from "../../../../service";
import {setCompleteOption} from "../../reducer";

const MultiSelectComponent = ({name, label, handleAutoCompleteChange, onResult, dialogTitle, path, autoCompleteOption, dispatch}) => {
    const classes = useStyles();

    const [listData, setListData] = useState([]);
    const [autoCompleteValue, setAutoCompleteValue] = useState(null);
    const [openMultiSelect, setOpenMultiSelect] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
        setAutoCompleteValue(null);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
        let newList = [...listData, autoCompleteValue];
        setListData(newList);
        onResult(newList, name);
        dispatch(setCompleteOption({data: [], loading: false}))
    }

    const SearchInAPI = (event, value) => {
        if(event.type != 'change') return;
        handleAutoCompleteChange(value, path)
    }

    const onChange = (event, value) => {
        if(value?.id)
            setAutoCompleteValue(value)

    }


    return (
        <div className={classes.multiSelectBox}>
            <AppBar position="relative" >
                <Toolbar className={classes.multiSelectToolbar}>
                    <IconButton className={classes.multiSelectAddButton} color="inherit" onClick={handleClickOpenDialog}>
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>
                    <div className={classes.multiSelectDialogTitle}>
                        {dialogTitle ? dialogTitle : 'Pesquise'}
                        <IconButton color="inherit" onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent className={classes.multiSelectDialogContent}>
                    <Autocomplete
                        open={openMultiSelect}
                        onOpen={() => setOpenMultiSelect(true)}
                        onClose={(e) => setOpenMultiSelect(false)}
                        onChange={onChange}
                        onInputChange={(event, value) => SearchInAPI(event, value)}
                        getOptionLabel={(option) => option.name}
                        options={autoCompleteOption.data}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label || name}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {autoCompleteOption.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'}  onClick={handleCloseDialog} color="primary" autoFocus>
                        Adicionar
                    </Button>
                </DialogActions>
            </Dialog>


            <MUIDataTable
                title={label || 'Items'}
                data={listData}
                columns={[
                    {
                        name: "id",
                        label: "ID",
                    },
                    {
                        name: "name",
                        label: "Nome",
                    },
                ]}
                options={{
                    download: false,
                    print: false
                }}
            />
        </div>
    );
}

export default MultiSelectComponent;

const useStyles = makeStyles((theme) => ({
    multiSelectBox: {
        flexGrow: 1,
        width: '100% !important'
    },
    multiSelectAddButton: {
        marginRight: theme.spacing(2),
    },
    multiSelectToolbar: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    multiSelectDialogContent: {
        width: '600px'
    },
    multiSelectDialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));


