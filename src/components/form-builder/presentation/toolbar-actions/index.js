import React from "react";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReceiptIcon from "@material-ui/icons/Receipt";
import SaveIcon from "@material-ui/icons/Save";
import {makeStyles} from "@material-ui/core/styles";
import ActionEnum from "../../enum/action.enum";

const ToolBarActions = ({onExit, location, FORM_ID, actionBar=[], objId}) => {
    const classes = useStyles();

    return (<AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolBarForm}>
            <IconButton color="inherit" onClick={onExit} component={Link} to={location.pathname.replace('form', 'list')}>
                <ArrowBackIcon />
            </IconButton>
            <div>
                {actionBar.map(item => {
                    switch (item.name){
                        case ActionEnum.CLOSE_ORDER:
                            return <IconButton color="inherit" onClick={()=>item.action(objId)}>
                                <ReceiptIcon />
                            </IconButton>;

                        default:
                            return;
                    }
                })}

                <IconButton color="inherit" type={'submit'} form={FORM_ID}>
                    <SaveIcon />
                </IconButton>
            </div>
        </Toolbar>
    </AppBar>);
}

export default ToolBarActions;


const useStyles = makeStyles((theme) => ({
    toolBarForm: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    appBar: {
        marginBottom: 24
    },
}));
