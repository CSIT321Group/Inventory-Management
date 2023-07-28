import { useState } from "react";
import { Select } from "./Select.tsx";

export default function DropDown() {
    const [value, setValue] = useState('');

    return (
        <>
            <Select
            value={value}
            onChange={setValue}
            options={[
                {value: '', label: 'Summary Report'},
                {value: 'out-of-stock', label: 'Out-of-Stock'},
                {value: 'ordered', label: "Ordered"}
            ]} />

        </>
    )
}