import React from 'react'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

export default function Currency() {

    const [value, setValue] = React.useState();

    return (
        <CurrencyTextField
            label="Amount"
            variant="standard"
            value={value}
            currencySymbol="$"
            //minimumValue="0"
            outputFormat="string"
            decimalCharacter="."
            digitGroupSeparator=","
            onChange={(event, value)=> setValue(value)}
        />
    );
}
