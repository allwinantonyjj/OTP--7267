/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search', 'N/email', 'N/runtime'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search, email, runtime) => {

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
                    columns: [ 'tranid', 'trandate', 'entity', 'total' ],
                    title: 'Search Invoice JJ',
                    id: '_jj_dailytest_q2',
                    isPublic: true
                });
                let searchResults = searchInvoice.run();
                log.debug(searchResults);
                let invoiceDetails = "";
                searchResults.each(function(obj) {
                    let docnum = obj.getValue('tranid');
                    let trandate = obj.getValue('trandate');
                    let custName = obj.getText('entity');
                    
                    invoiceDetails += `Document Number: ${docnum}, Transaction Date: ${trandate}, Customer Name: ${custName} \n \n`
                    
                    return true;
                });
                // let author = runtime.getCurrentUser();
                // let user = author.id 
                // log.debug("a: ",user);
                email.send({
                    // author: user,
                    author: -5,
                    body: invoiceDetails,
                    recipients: -5,
                    subject: 'Open Invoice Details'
                });
            } catch (error) {
                log.debug(error);
            }
        }

        return {execute}

    });
