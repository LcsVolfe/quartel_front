import React, {useState} from "react";
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

const MultiSelectComponent = (props) => {
    const classes = useStyles();

    const [listData, setListData] = useState([]);
    const [autoCompleteValue, setAutoCompleteValue] = useState(null);
    const [openMultiSelect, setOpenMultiSelect] = useState(false);
    const [optionsMultiSelect, setOptionsMultiSelect] = useState([]);
    const loadingMultiSelect = openMultiSelect && optionsMultiSelect.length === 0;

    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => {
        let newList = [...listData, autoCompleteValue];
        setListData(newList);
        props.onResult(newList, props.name);
        setOpenDialog(false);
    }



    React.useEffect(() => {
        let active = true;

        if (!loadingMultiSelect) {
            return undefined;
        }

        (async () => {
            const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            let options = await response.json();
            options = [
                {
                    id: 1,
                    name: '11'
                },
                {
                    id: 2,
                    name: '22'
                },
                {
                    id: 3,
                    name: '33'
                },
                {
                    id: 4,
                    name: '44'
                },
                {
                    id: 5,
                    name: '55'
                },
                {
                    id: 6,
                    name: '66'
                }
            ]

            if (active) {
                setOptionsMultiSelect(Object.keys(options).map((key) => options[key]));
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingMultiSelect]);


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
                        {props?.dialogTitle ? props.dialogTitle : 'Pesquise'}
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
                        // onChange={(event) => console.log('onChange', event.target.value)}
                        // onInputChange={(event) => console.log('onInputChange', event)}
                        getOptionSelected={(option, value) => {
                            setAutoCompleteValue(option);
                            return option.name === value.name;
                        }}
                        getOptionLabel={(option) => option.name}
                        options={optionsMultiSelect}
                        loading={loadingMultiSelect}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={props?.label || props?.name}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loadingMultiSelect ? <CircularProgress color="inherit" size={20} /> : null}
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
                title={props?.tableTitle ? props.tableTitle : 'Items'}
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
