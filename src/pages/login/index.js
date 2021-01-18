import {useHistory, useLocation} from "react-router-dom";
import React from "react";
import {Login} from "../../components/login";


export default function LoginPage({useAuth}) {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    return (<Login auth={auth} location={location} history={history} />);
}


