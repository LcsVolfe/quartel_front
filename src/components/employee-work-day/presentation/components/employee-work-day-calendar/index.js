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
import EmployeeWorkDayFormPage from "../../../../../pages/employee-work-day/form";


const localizer = momentLocalizer(moment)



const EmployeeWorkDayCalendar = ({events=[], handlerCreateNewWorkDay, handlerDeleteWorkDay}) => {
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(false);
    const [state, setState] = useState();
    const [startEvent, setStartEvent] = useState();

    const handleClickOpen = (event) => {
        setSelectedEvent(event)
        setOpen(true);
    }
    const handleClose = (confirm) => {
        if(confirm && state?.employee && state?.order){
            state.employee = state.employee.id;
            state.order = state.order.id;
            handlerCreateNewWorkDay(state);
        }
        setSelectedEvent(null);
        setOpen(false);
    }

    const TakeFormReference = (state) => setState(state);

    const handleSelect = ({ start }) => {
        setStartEvent(start)
        setOpen(true);
    }
    const handleDelete = () => {
        handlerDeleteWorkDay(selectedEvent)
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={()=>handleClose(false)}
            >
                <DialogTitle>{'Registrar dia de trabalho'}</DialogTitle>
                <DialogContent>
                    <EmployeeWorkDayFormPage TakeFormReference={TakeFormReference} workDay={startEvent} selectedEvent={selectedEvent} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleClose(false)} color="primary">
                        Cancelar
                    </Button>
                    {selectedEvent?.id && <Button onClick={()=>handleDelete()} color="primary">
                        Deletar
                    </Button>}
                    <Button onClick={()=>handleClose(true)} color="primary" autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>


            <Calendar
                selectable
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
                onSelectSlot={handleSelect}
            />
        </div>
    )
}

export default EmployeeWorkDayCalendar
