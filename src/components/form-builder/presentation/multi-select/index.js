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
import {setCompleteOption} from "../../reducer";
import FormBuilderPresentation from "../index";
import typesEnum from "../../enum/types.enum";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const MultiSelectComponent = ({
          name, label, handleAutoCompleteChange, onResult, initValue, setFormState,
          dialogTitle, path, autoCompleteOption, dispatch, additionalFields, columns}) => {
    const classes = useStyles();

    const [listData, setListData] = useState(initValue || []);
    const [autoCompleteValue, setAutoCompleteValue] = useState(null);
    const [openMultiSelect, setOpenMultiSelect] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const rowsSelected = useState([]);


    const handleClickOpenDialog = () => {
        setOpenDialog(true);
        setAutoCompleteValue(null);
    }
    const handleCloseDialog = (data) => {
        let newList = listData;
        let toSave;
        if(autoCompleteValue && data) {
            toSave = autoCompleteValue;
            if(additionalFields){
                toSave = {}
                additionalFields.map(field=> {
                    if(field.type != typesEnum.INVISIBLE) return;
                    toSave[field.name] = autoCompleteValue.id;
                    toSave.name = autoCompleteValue.name;
                })
                toSave = {...data, ...toSave}
            }
            newList = [...listData, toSave];
        }
        setOpenDialog(false);
        setListData(newList);
        onResult(newList, name);
        dispatch(setCompleteOption({data: [], loading: false}))
    }

    const SearchInAPI = (event, value) => {
        if(event.type != 'change') return;
        handleAutoCompleteChange(value, path)
    }

    const onChange = (event, value) => {
        console.log(value)
        if(value?.id)
            setAutoCompleteValue(value)
    }


    const onRowsDelete = (list) => {
        let listIds = [];
        list.data.map(item => {
            listIds.push(listData[item.dataIndex]?.id)
        })
        let newList = listData.filter(item=>!listIds.includes(item.id));
        setListData(newList)
        setFormState(name, newList)
        // console.log()
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
                onClose={()=>handleCloseDialog(false)}
            >
                <DialogTitle>
                    <div className={classes.multiSelectDialogTitle}>
                        {dialogTitle ? dialogTitle : 'Pesquise'}
                        <IconButton color="inherit" onClick={()=>handleCloseDialog(false)}>
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

                    {additionalFields ? <FormBuilderPresentation
                        controls={additionalFields}
                        onClick={handleCloseDialog}
                        toolBar={false}
                        elevation={0}
                    />: null}

                </DialogContent>
                {!additionalFields ? <DialogActions>
                    <Button variant={'contained'}  onClick={()=>handleCloseDialog(true)} color="primary" autoFocus>
                        Adicionar
                    </Button>
                </DialogActions>: null}

            </Dialog>


            <MUIDataTable
                title={label || 'Items'}
                data={listData}
                columns={columns || [
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
                    print: false,
                    rowsSelected,
                    selectableRowsOnClick: true,
                    onRowsDelete,
                    customToolbarSelect: (selectedRows) => (
                        <div>
                            {selectedRows.data.length === 1 ? <Tooltip title={"Editar"}>
                                <IconButton onClick={()=>console.log(rowsSelected)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>: null}

                            <Tooltip title={"Deletar"}>
                                <IconButton onClick={()=>onRowsDelete(selectedRows)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    )
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


