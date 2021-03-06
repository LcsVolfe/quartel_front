import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import {ListToFormEdit} from "../../../../utils/navigation";
import CustomDialog from "../../../shared/dialog";

const CustomToolbarSelect = ({customActionLabel, selectedRows, data, deleteItem, history, editAction, customAction,
                                 customActionIcon,  canDelete=true}) => {

    const [openDeletedDialog, setOpenDeletedDialog] = useState(false);
    // const [confirmDeletItems, setConfirmDeletItems] = useState(false);
    const [listIds, setListIds] = useState([]);


    const handleClick = async (type) => {
        let listIds = [];
        let values = [];
        selectedRows.data.map((item, i) => {
        	listIds.push(data[item.dataIndex]?.id)
            values.push(data[item.dataIndex])
        });
        setListIds(listIds);

        switch (type){
            case 1: // DELETE
                setOpenDeletedDialog(true);
                // if (confirmDeletItems)
                //     deleteItem(listIds);
                break;

            case 2: // EDIT
                ListToFormEdit(history, listIds[0])
                break;
            case 3: // CUSTOM
                customAction(listIds, values)
                break;
            default:
                return
        }
    }

    const handlerDialog = (value) => {
        if (value)
            deleteItem(listIds);
    }

    return (
        <div>
            {customAction ? <Tooltip title={customActionLabel}>
                <IconButton onClick={()=>handleClick(3)}>
                    {customActionIcon ? customActionIcon : <PriorityHighIcon />}
                </IconButton>
            </Tooltip>: null}

            {selectedRows.data.length === 1 && editAction ? <Tooltip title={"Editar"}>
                <IconButton onClick={()=>handleClick(2)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>: null}

            {canDelete && (
                <Tooltip title={"Deletar"}>
                    <IconButton onClick={()=>handleClick(1)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}

            <CustomDialog
                onAccept={handlerDialog}
                setOpen={setOpenDeletedDialog}
                open={openDeletedDialog}
                title={'Deseja realmente excluir?'}
            />
        </div>
    );

}

export default CustomToolbarSelect;
