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
import FormBuilderPresentation from "../../../../form-builder/presentation";
import PStypesEnum from "../../../../form-builder/enum/types.enum";


const localizer = momentLocalizer(moment)



const DebtsCalendar = ({handlerDebtDatePay, events=[]}) => {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(false);
    const [datePay, setDatePay] = useState(false);

    const handleClickOpen = (event) => {
        setSelectedEvent(event)
        setOpen(true);
    }
    const handleClose = (confirm) => {
        if(confirm)
            handlerDebtDatePay({datePay, isPaid: true}, selectedEvent.id);
        setOpen(false);
    }
    const TakeFormReference = ({state}) => setDatePay(state?.datePay);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Deseja dar baixa na conta?"}</DialogTitle>
                <DialogContent>
                    Total da conta: R$ {selectedEvent?.amount}
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
            />
        </div>
    )
}

export default DebtsCalendar
