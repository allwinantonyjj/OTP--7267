/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            try {
                let filters = [
                    ['entity', 'is', 31],
                    'AND',
                    ['mainline', 'is', 'T']
                ];
                let columns = [
                    search.createColumn({name: 'tranid', label: 'transaction id'}),
                    search.createColumn({name: 'trandate', label: 'transaction date'}),
                    search.createColumn({name: 'total', label: 'total amount'}),
                    search.createColumn({name: 'status', label: 'status'})
                ];
                let searchCreditMemo = search.create({
                    type: search.Type.CREDIT_MEMO,
                    id: '_jj_ue_q2searchcreditmemo',
                    filters: filters,
                    columns: columns
                });

                let searchResult = searchCreditMemo.run();
                searchResult.each(function(obj){
                    let tranId = obj.getValue({name: 'tranid'});
                    let trandate = obj.getValue({name: 'trandate'});
                    let totAmount = obj.getValue({name: 'total'});
                    let status = obj.getValue({name: 'status'});

       
                    log.debug('Credit Memo Details: ', 'Transaction ID: ' + tranId +
                              ', Transaction Date: ' + trandate +
                              ', Total Amount: ' + totAmount +
                              ', Status: ' + status);
       
                    return true;
                });

            } catch (error) {
                log.debug({
                    title: 'error occured',
                    details: 'error msg: ' +error
                })
            }
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
