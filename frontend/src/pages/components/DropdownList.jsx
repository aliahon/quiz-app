import React, { useState } from 'react';
import useUser from "../../hooks/useUser";

export default function DropdownList({onSendId}) {

    const { marks } = useUser();
    const [selectedValue, setSelectedValue] = useState(marks[0]._id || '');
    const handleChange = (e) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        onSendId(newValue); // Pass the selected value to the parent
    };
    const formatDateAndTime = (markId) => {
        let date = markId.substr(0, 10); // Extract date part (YYYY-MM-DD)
        let hour = markId.substr(11, 5); // Extract time part (HH:MM)
        return `${date} ${hour}`; // Concatenate date and time with a space
    };
    
    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            className='mb-5 py-2 px-4 pl-2 text-sm bg-quiz-theme text-white rounded w-1/3 '
        >
            {marks.map((mark) => (
                <option className="bg-[#343A40ff]" key={mark._id} value={mark._id}>
                    {formatDateAndTime(mark._id)}
                </option>
            ))}
        </select>
    );
};