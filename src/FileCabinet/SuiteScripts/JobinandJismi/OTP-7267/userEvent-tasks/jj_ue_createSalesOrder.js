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
                let objSalesOrder = record.create({
                    type: record.Type.SALES_ORDER,
                    isDynamic: true,
                    // defaultValues: {
                    //     entity: 100
                    // }
                });
                objSalesOrder.setValue({
                    fieldId: 'entity',
                    value: 31
                });
                let itemList = {
                    36:20, //itemId:quantity
                    35:15
                }
                util.each(itemList, function(quantity, itemId){
                    objSalesOrder.selectNewLine('item');
                    objSalesOrder.setCurrentSublistValue('item', 'item', itemId);
                    objSalesOrder.setCurrentSublistValue('item', 'quantity', quantity);
                    objSalesOrder.commitLine('item');
                });

                let salesOrderId = objSalesOrder.save({
                    ignoreMandatoryFields: true,
                    enableSourcing: true
                });
                log.debug({
                    title: 'Sales order created',
                    details: 'sales order id: ' +salesOrderId
                });

            } catch (error) {
                log.debug({
                    title:'error occured',
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

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
