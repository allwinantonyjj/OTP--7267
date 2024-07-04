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
                    ['status', 'is', 'CustInvc:A'],
                    'AND',
                    ['mainline', 'is', 'T']
                ];
                let columns = [
                    search.createColumn({name:'tranid', label:'Document number'}),
                    search.createColumn({ name: 'trandate', label: 'Date' }),
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'email', label: 'Customer Email' }),
                    search.createColumn({ name: 'amount', label: 'Amount' })
                ];

                let searchInvoice = search.create({
                    type: search.Type.INVOICE,
                    title: 'SuiteScript Open Invoice JJ',
                    id: '_jj_suitescriptopeninvoice',
                    filters: filters,
                    columns: columns
                });
                searchResult = searchInvoice.run();
                searchResult.each(function(obj){
                    documentNumber = obj.getValue({ name: 'tranid' });
                    date = obj.getValue({ name: 'trandate' });
                    customerName = obj.getText({ name: 'entity' });
                    customerEmail = obj.getValue({ name: 'email', join: 'customer' });
                    amount = obj.getValue({ name: 'amount' });

                    log.debug('Document Number: ' + documentNumber + ', Date: ' + date +
                        ', Customer Name: ' + customerName + ', Customer Email: ' + customerEmail +
                        ', Amount: ' + amount
                    );
                    return true;
                });

            } catch (error) {
                log.debug({
                    title: 'error occured',
                    details: 'error msg: ' + error
                });
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
