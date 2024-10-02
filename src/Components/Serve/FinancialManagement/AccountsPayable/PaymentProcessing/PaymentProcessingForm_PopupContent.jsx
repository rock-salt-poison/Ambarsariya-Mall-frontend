import React from 'react';
import GeneralLedgerForm from '../../../../Form/GeneralLedgerForm';

function PaymentProcessingForm_PopupContent({selectedInvoice}) {
    // Assuming you may get initial data from somewhere, here it's set to empty for demo
    const initialData = selectedInvoice || {
        invoice_no: '',  // Example: replace with actual data as needed
        total_amount: '0',
        payment_method: '',
        payment_date: '',
        reference_no: '',
        paid_amount: '0',
        balance_amount: '0'
    };

    const formFields = [
        {
            id: 1,
            label: 'Invoice No',
            name: 'invoice_no',
            type: 'text',
            value: initialData["invoice_no"],  // Fixed here
            readOnly: true,
        },
        {
            id: 2,
            label: 'Total Amount',
            name: 'total_amount',
            type: 'text',
            adornmentValue:'Rs',
            value: initialData["total_amount"],
            readOnly: true,
        },
        {
            id: 3,
            label: 'Payment Method',
            name: 'payment_method',
            type: 'text',
            value: initialData["payment_method"],
            readOnly: true,
        },
        {
            id: 4,
            label: 'Payment Date',
            name: 'payment_date',
            type: 'text',
            value: initialData["payment_date"],
            readOnly: true,
        },
        {
            id: 5,
            label: 'Reference No',
            name: 'reference_no',
            type: 'text',
            value: initialData["reference_no"],
            readOnly: true,
        },
        {
            id: 6,
            label: 'Paid Amount',
            name: 'paid_amount',
            type: 'text',
            value: initialData["paid_amount"],
            adornmentValue:'Rs',
            readOnly: true,
        },
        {
            id: 7,
            label: 'Balance Amount',
            name: 'balance_amount',
            adornmentValue:'Rs',
            type: 'text',
            value: initialData["balance_amount"],
            readOnly: true,
        },
    ];

    return (
        <GeneralLedgerForm
            formfields={formFields}
            errors={''}
            formData={initialData}
            submitBtnVisibility={false}
        />
    );
}

export default PaymentProcessingForm_PopupContent;
