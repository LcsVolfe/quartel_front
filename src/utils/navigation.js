export function FormToList(history) {
    console.log(history.location.pathname)

    history.push(history.location.pathname.replace('form', 'list'));
}

export function ListToForm(history) {
    history.push(history.location.pathname.replace('list', 'form'));
}

export function TakePathRoute(history) {
    return history?.location?.pathname.slice(6)
}

export function TakePathAPIWithId(id, history) {
    return history?.location?.pathname.slice(6)+`/${id}`
}

export function ListToFormEdit(history, id) {
    history.push(history.location.pathname.replace('list', 'form')+`?id=${id}`);
}
