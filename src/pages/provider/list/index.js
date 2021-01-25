import React from 'react';
import {TableRender} from "../../../components/table-render";
import {MaskColumn} from "../../../components/table-render/presentation";
import MaskEnum from "../../../components/form-builder/enum/mask.enum";

const ProviderListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "phone",
            label: "Telefone",
            options: {customBodyRender: value => MaskColumn(value, MaskEnum.PHONE)}
        },
    ];

    return (<TableRender columns={columns} title={'Fornecedores'} />);
}

export default ProviderListPage;
