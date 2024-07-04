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
                
                let objPO = record.create({
                    type: record.Type.PURCHASE_ORDER,
                    isDynamic: true,
                    // defaultValues: {
                    //     entity:100
                    // }
                });
                objPO.setValue({
                    fieldId: 'entity',
                    value: 27
                });
                objPO.setValue({
                    fieldId: 'location',
                    value: 2
                })

                itemList = {
                    36:250,
                    35:190
                }
                util.each(itemList, function(quantity, itemId){
                    objPO.selectNewLine('item');
                    objPO.setCurrentSublistValue('item', 'item', itemId);
                    objPO.setCurrentSublistValue('item', 'quantity', quantity);
                    objPO.commitLine('item');
                });
                let POId = objPO.save({
                    ignoreMandatoryFields: true,
                    enableSourcing: true
                });
                log.debug({
                    title: 'Purchase order created',
                    details: 'purchase order id: ' +POId
                });

            } catch (error) {
                log.debug({
                    title: 'error occured',
                    details: 'error msg: '+error
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
