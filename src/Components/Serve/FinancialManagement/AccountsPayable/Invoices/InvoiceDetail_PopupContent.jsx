import React, { useState } from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';
import { ThemeProvider } from '@mui/material';
import createCustomTheme from '../../../../../styles/CustomSelectDropdownTheme';

function InvoiceDetail_PopupContent() {

    const themeProps = {
        popoverBackgroundColor: '#f8e3cc',
        scrollbarThumb: 'var(--brown)',
      };
    
      const theme = createCustomTheme(themeProps);

    const initialData = {
        selected_daterange:'',
        selected_po:'',
        invoice_amount:'',
        due_date:'',
    };

    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const formFields = [
        {
            id: 1,
            label: 'Select Date',
            name: 'selected_daterange',
            type: 'daterange',
        },
        {
            id: 2,
            label: 'Select P.O(s)',
            name: 'selected_po',
            type: 'select',
            options: ['Purchase Order 1', 'Purchase Order 2', 'Purchase Order 3', 'Purchase Order 4', 'Purchase Order 5']
        },
        {
            id: 3,
            label: 'Invoice Amount',
            name: 'invoice_amount',
            type: 'text',
            behavior:'numeric',
            readOnly:true
        },
        {
            id: 4,
            label: 'Due date',
            name: 'due_date',
            type: 'date',
        },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear any previous error for this field
        setErrors({ ...errors, [name]: null });
    };

    const validateForm = () => {
        const newErrors = {};

        formFields.forEach(field => {
            const name = field.name;
            // Validate main fields
            if (!formData[name]) {
                newErrors[name] = `${field.label} is required.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            console.log(formData);
            // Proceed with further submission logic, e.g., API call
        } else {
            console.log(errors);
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <GeneralLedgerForm
            formfields={formFields}
            handleSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            errors={errors}
        />
        </ThemeProvider>
    );
}

export default InvoiceDetail_PopupContent;
