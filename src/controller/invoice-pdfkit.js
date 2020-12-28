const invoice = require('../model/invoices')
const {createInvoice} = require('../service/createInvoice')

createInvoice(
    invoice,
    `outputs/invoice${(Math.random() * 1000).toFixed()}.pdf`
)