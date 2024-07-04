/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 */
    (email, record, search) => {
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
            try{
                // const id = scriptContext.newRecord.id;
                const custId = scriptContext.newRecord.getValue({
                    fieldId: 'entity'
                });
                log.debug(custId)
                let custRec = record.load({
                    type: record.Type.CUSTOMER,
                    id: custId,
                    isDynamic: true
                });
                const overdueBalance = custRec.getValue({
                    fieldId: 'overduebalance'
                });
                let salesrep = custRec.getValue({
                    fieldId: 'salesrep'
                });
                log.debug(salesrep);
                let salesrepRec = record.load({
                    type: record.Type.EMPLOYEE,
                    id: salesrep,
                    isDynamic: true
                });
                let repSupervisor = salesrepRec.getValue({
                    fieldId: 'supervisor'
                });
                log.debug(repSupervisor);
                if(overdueBalance>0) {
                    email.send({
                        author: -5,
                        body: "sales order is created for a customer with overdue balance.",
                        recipients: repSupervisor,
                        subject: "user event task question 5"
                    });
                    log.debug("email sent to supervisor");
                }
                else{
                    log.debug("no overdue for the customer");
                }
            }
            catch(error){
                log.debug(error);
            }
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