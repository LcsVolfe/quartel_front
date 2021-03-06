import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'clipboard-copy';

import FormBuilderPresentation from "../../../../form-builder/presentation";
import PStypesEnum from "../../../../form-builder/enum/types.enum";
import {GatewayOptions} from "../../../../../pages/order/form/options";
import {Chip, IconButton, makeStyles} from "@material-ui/core";
import {ToDecimal} from "../../../../../utils/number";
import {Alert} from "@material-ui/lab";


const localizer = momentLocalizer(moment)

const Event = (e, handleClickOpen) => {
    let late = new Date(e.event.start) < new Date();
    const classes = useStyles({backgroundColor: late ? 'red' : 'green'});
    return (<Chip
            label={e.event.title}
            onClick={()=>handleClickOpen(e.event)}
            size="small"
            className={classes.root}
        />
    )
}


const DebtsCalendar = ({handlerDebtDatePay, events=[]}) => {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(false);
    const [datePay, setDatePay] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClickOpen = (event) => {
        setSelectedEvent(event)
        setOpen(true);
    }
    const handleClose = (confirm) => {
        if(confirm)
            handlerDebtDatePay({datePay, isPaid: true}, selectedEvent.id);
        setOpen(false);
        setCopied(false);
    }

    const TakeFormReference = ({state}) => setDatePay(state?.datePay);

    return (
        <div>
            <Dialog
                open={open}
                onClose={()=>handleClose(false)}
            >
                <DialogTitle>{"Confirmar pagamento?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Método de pagamento: {GatewayOptions.map(gateway => {
                        if (gateway.value == selectedEvent?.gateway) return gateway.label
                    }) }</DialogContentText>
                    <DialogContentText>Total da conta: R$ {ToDecimal(selectedEvent?.amount)}</DialogContentText>
                    {selectedEvent?.documentNumber && (<DialogContentText>N. Documento: {selectedEvent.documentNumber.length > 10 ?
                        `${selectedEvent.documentNumber.slice(0, 10)}...` : selectedEvent.documentNumber}
                        <IconButton
                            color={!copied ? 'primary' : 'secondary'}
                            onClick={() => {
                                copy(selectedEvent.documentNumber);
                                setCopied(true);
                            }}
                        >
                            <FileCopyIcon />
                        </IconButton>
                    </DialogContentText>)}

                    <FormBuilderPresentation
                        TakeFormReference={TakeFormReference}
                        controls={[{label: 'Data Pagamento', name: 'datePay', type: PStypesEnum.DATE}]}
                        actionBar={false}
                        saveBtn={false}
                        elevation={0}
                        inputFullWidth={true}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleClose(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={()=>handleClose(true)} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>


            <Calendar
                popup
                localizer={localizer}
                messages={{
                    next: "Próximo",
                    previous: "Voltar",
                    today: "Hoje",
                    month: "Mês",
                    week: "Semana",
                    day: "Día",
                    showMore: function(e) {
                        return 'Ver mais ' + e
                    }
                }}
                events={events}
                views={['month']}
                style={{ height: 600, width: 800 }}
                onSelectEvent={(e)=>handleClickOpen(e)}
                components={{
                    eventWrapper: (e) => Event(e, handleClickOpen),
                }}
            />

        </div>
    )
}


const useStyles = makeStyles((theme) => {
    return ({
        root: {
            // backgroundColor: theme.backgroundColor,
            backgroundColor: props => props.backgroundColor,
            "&:hover": {
                background: props => props.hover
            },
            color: 'white',
            fontWeight: 'bold'
        },
    })
});

export default DebtsCalendar;
