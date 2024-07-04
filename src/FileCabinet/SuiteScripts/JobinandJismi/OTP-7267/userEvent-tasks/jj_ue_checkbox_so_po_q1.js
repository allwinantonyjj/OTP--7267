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
            try {
                if(scriptContext.type == scriptContext.UserEventType.CREATE){
                    //checking checkbox for customer via sales order
                    if(scriptContext.newRecord.type == record.Type.SALES_ORDER){
                        log.debug('entered if salesorder condition');
                        const objSO = scriptContext.newRecord;
                        let custId = objSO.getValue({
                            fieldId:'entity'
                        });

                        let custObj = record.load({
                            type : record.Type.CUSTOMER,
                            id: custId,
                            isDynamic: true
                        });
                        custObj.setValue({
                            fieldId: 'custentity_jj_so_po_checkbox',
                            value: true
                        });

                        custObj.save();
                        log.debug('Customer checkbox updated', 'Customer ID: ' +custId);
                    }

                    //checking checkbox for vendor via purchase order
                    if(scriptContext.newRecord.type == record.Type.PURCHASE_ORDER){
                        log.debug('entered if purchaseorder condition');
                        let objPO = scriptContext.newRecord;
                        let vendId = objPO.getValue(
                            {fieldId: 'entity'}
                        );

                        let vendObj = record.load({
                            type: record.Type.VENDOR,
                            id: vendId,
                            isDynamic: true
                        });
                        vendObj.setValue({
                            fieldId: 'custentity_jj_so_po_checkbox',
                            value: true
                        });

                        vendObj.save();
                        log.debug('Vendor checkbox updated', 'Vendor ID: ' +vendId);
                    }
                }
            } catch (error) {
                log.debug('error msg: '+error);
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });