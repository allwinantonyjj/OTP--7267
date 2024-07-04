/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 */
    (email, record, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try {
                let searchInvoice = search.create({
                    type: search.Type.INVOICE,
                    filters: [
                        ['mainline', 'is', 'T'],
                        'AND',
                        ['status', 'is', 'CustInvc:A']
                    ],
                    columns: [ 'tranid', 'entity' ],
                    title: 'Search Invoice JJ',
                    id: '_jj_searchinvoices',
                    isPublic: true
                });
                let searchResults = searchInvoice.run();
                log.debug(searchResults);
                let invoiceDetails = "";
                searchResults.each(function(obj){
                    let docnum = obj.getValue('tranid');
                    let custName = obj.getText('entity');
    
                    invoiceDetails += `Invoice document number: ${docnum}, Customer name: ${custName} \n`;
                    return true;
                });
                log.debug('details',invoiceDetails);
                email.send({
                    author: -5,
                    body: invoiceDetails,
                    recipients: -5,
                    subject: 'Open invoice details'
                });
            } catch (error) {
                log.debug(error);
            }
        }
        return { execute }
    });