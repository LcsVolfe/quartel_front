import React, {useEffect, useState} from "react";
import {Alert} from "@material-ui/lab";
import {Snackbar} from "@material-ui/core";

const TSnackbar = ({errorRequest, data = {}, status, statusText, message='Operação realizada com sucesso!', method}) => {
    const [openSnackBack, setOpenSnackBack] = useState(false);
    const handleCloseSnackBack = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackBack(false);
    };
    const handleClickSnackBack = () => setOpenSnackBack(true);
    let errorItems = '';
    if(Array.isArray(data))
        Object.keys(data).map(item => errorItems += ' ' + item)
    if(errorRequest)
        message = `${status} ${statusText}`;
        if(method == 'post')
             message += `Verifique os campos:  ${errorItems}`;
    let severity = errorRequest ? 'error' : 'success';

    useEffect(()=>{
        // console.log('>>>>>>>>>>>> useEffect',
        //     'openSnackBack: '+ openSnackBack,
        //     'errorRequest: ' + errorRequest,
        //     'status: ' + status,
        // )
        if(errorRequest !== undefined)
            setOpenSnackBack(true)
    }, [errorRequest])


    // console.log('>>>>>>>>>>>> return',
    //     'openSnackBack: '+ openSnackBack,
    //     'errorRequest: ' + errorRequest,
    //     'status: ' + status,
    //     )

    return (
        <Snackbar
            open={openSnackBack}
            autoHideDuration={1500}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            onClose={handleCloseSnackBack}
        >
            <Alert onClose={handleCloseSnackBack} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}


export default TSnackbar;
