import React, {useEffect, useState} from 'react';
import {TableRender} from "../../../components/table-render";
import ApiService from "../../../service";

const ProductListPage = () => {
    let columns = [
        {
            name: "name",
            label: "Nome",
        },
        {
            name: "isSelling",
            label: "isSelling",
        },
        {
            name: "amount",
            label: "Quantidade",
        },
    ];

    return (<TableRender columns={columns} callBack={ApiService.ListProducts} />);
}

export default ProductListPage;

