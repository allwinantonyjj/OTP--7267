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
                let columns = [
                    search.createColumn({name: 'tranid', label: 'Documnet number'}),
                    search.createColumn({name: 'trandate', label: 'date'}),
                    search.createColumn({name: 'entity', label: 'Customer Name'}),
                    search.createColumn({name: 'amount', label: 'amount'})
                ];
                let filters = [
                    ['status', 'is', 'SalesOrd:B'],
                    'AND',
                    ['mainline', 'is', 'T']
                ];
                let searchSO = search.create({
                    type: search.Type.SALES_ORDER,
                    id: '_jj_ue_q1searchSO',
                    filters: filters,
                    columns: columns
                });

                let searchResult = searchSO.run()
                // let searchResult = searchSO.run();
                searchResult.forEach(function(obj){
                    let docNum = obj.getValue({name: 'tranid'});
                    let date = obj.getValue({name: 'trandate'});
                    let custName = obj.getText({name: 'entity'});
                    let amount = obj.getValue({name: 'amount'});
                    
                    log.debug(
                        ('Document Number: ' +docNum, ', date: '+date, ', Customer Name: '+custName, 'Amount: '+amount)
                    );
                    return true;
                })
            } catch (error) {
                log.debug({
                    title: 'error occured',
                    details: 'error msg: ' + error
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
