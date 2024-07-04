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
            try {
                let custRec = scriptContext.newRecord;
               
                if (custRec.type === record.Type.CUSTOMER) {
                    let custName = custRec.getValue('companyname') || custRec.getValue('firstname');
                    let createdDate = custRec.getText({
                        fieldId: 'datecreated'
                    });
                    log.debug("Created date is", createdDate);
                    
                    if (custName) {
                        let shortLetters = custName.substring(0, 2);
            
                        let dateCreated = new Date(custRec.getValue({ fieldId: 'datecreated' }) || new Date());
                        let month = ('0' + (dateCreated.getMonth() + 1)).slice(-2);
            
                        let shortName = shortLetters + ": " + month;
            
                        custRec.setValue({
                            fieldId: 'custentity_jj_shortname',
                            value: shortName
                        });
            
                        // No need to call save() as this is usually part of a beforeSubmit or afterSubmit script
                        log.debug("Short name updated", "Short name set to " + shortName);
                    } else {
                        log.error('Missing Name', 'The customer name is missing.');
                    }
                }
            } catch (error) {
                log.error("Error updating shortname field", error);
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
