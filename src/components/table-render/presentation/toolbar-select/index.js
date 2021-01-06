import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {ListToFormEdit} from "../../../../utils/navigation";

const CustomToolbarSelect = ({selectedRows, data, deleteItem, history}) => {


    const handleClick = async (type) => {
        let listIds = [];
        selectedRows.data.map(item => {
        	listIds.push(data[item.dataIndex]?.id)
        })

        switch (type){
            case 1: // DELETE
                deleteItem(listIds);
                break;

            case 2: // EDIT
                ListToFormEdit(history, listIds[0])
                break;
            default:
                return
        }
    }

    return (
        <div>
            {selectedRows.data.length === 1 ? <Tooltip title={"Editar"}>
                <IconButton onClick={()=>handleClick(2)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>: null}

            <Tooltip title={"Deletar"}>
                <IconButton onClick={()=>handleClick(1)}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </div>
    );

}

export default CustomToolbarSelect;
