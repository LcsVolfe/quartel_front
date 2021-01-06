import React from 'react';
import {TableRender} from "../../../components/table-render";
import {Switch} from "@material-ui/core";

const ProductListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "isSelling",
            label: "Venda",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value} color={'primary'}/>
                    </div>;
                }
            },
        },
        {
            name: "amount",
            label: "Quantidade",
        },
    ];

    return (<TableRender columns={columns} />);
}

export default ProductListPage;

