/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search', 'N/email', 'N/render'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search, email, render) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try {
                
                let searchSo = search.create({
                   type: search.Type.SALES_ORDER,
                   filters: [ ['mainline', 'is', 'T'], 'AND', ['datecreated', 'on', 'today'] ],
                   columns: [ 'internalid', 'entity', 'tranid' ]
                });
                let searchResults = searchSo.run();
                searchResults.each(function(obj) {
                    let customerId = obj.getValue('entity');
                    let soId = parseInt(obj.getValue('internalid'));
                    log.debug('customer: ' +customerId + ' , salesOrder id: ' + soId);
    
                    let soPdf = render.transaction({
                        entityId: soId,
                        printMode: render.PrintMode.PDF,
                    });
                    try {
                        email.send({
                            author: -5,
                            body: `Sales order created today. pdf attatched for details`,
                            recipients: customerId,
                            subject: 'scheduled script task 4 answer',
                            attachments: [soPdf]
                        });
                        
                    } catch (error) {
                        log.error('error in email:',error)
                    }

                    return true;
                });
            } catch (error) {
                log.error('error in main',error);
            }
        }

        return {execute}

    });
