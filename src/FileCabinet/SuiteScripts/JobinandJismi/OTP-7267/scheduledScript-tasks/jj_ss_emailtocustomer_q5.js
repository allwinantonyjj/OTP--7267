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
            // let searchCustomers = search.create({
            //     type: search.Type.CUSTOMER,
            //     filters: ['mainline', 'is', 'T'],
            //     columns: ['companyname', 'entityid']
            // });
            // let searchResults = searchCustomers.run();
            // searchResults.each(function(obj) {
            //     let custName = obj.getText('companyname').toString();
            //     let custId = obj.getValue('entityid');

            //     let slicedCustname = custName.slice(0,3);

            //     if(slicedCustname === 'Bea') {
            //         email.send({
            //             author: -5,
            //             body: 'everyday mail',
            //             recipients: custId,
            //             subject: 'scheduled script task5 answer',
            //         });
            //     }
            //     return true;
            // });

            // try {      
            //     let searchCustomers = search.create({
            //         type: search.Type.CUSTOMER,
            //         filters: [['subsidiary', 'is', 2], 'AND', ['companyname', 'startswith', 'Bea']],
            //         columns: ['companyname', 'entityid']
            //     });
            //     searchCustomers.run().each(function (obj) {
            //         let custName = obj.getValue('companyname')
            //         let custId = obj.getValue('entityid');
    
            //         email.send({
            //             author: -5,
            //             body: 'everyday email',
            //             recipients: custId,
            //             subject: 'scheduled script task5 answer',
            //         });
            //     });
            // } catch (error) {
            //     log.error('error in main code',error)
            // }

            try {
                let customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [
                        ['subsidiary', 'is', 3], 'AND',
                        ['companyname', 'startswith', 'Bea']
                    ],
                    columns: ['internalid', 'companyname']
                });
                customerSearch.run().each(function(result) {
                    let customerId = result.getValue('internalid');
                    let customerName = result.getValue('companyname');
                    log.error(customerId);
                    email.send({
                        author:-5,
                        recipients: customerId,
                        subject: 'Daily Update',
                        body: 'Dear ' + customerName + ',\n\nThis is your daily update.\n\nBest regards,\nArc Group'
                    });

                    return true;
                });
            } catch (error) {
                log.error('e: ',error)
            }
        }

        return { execute }

    });
