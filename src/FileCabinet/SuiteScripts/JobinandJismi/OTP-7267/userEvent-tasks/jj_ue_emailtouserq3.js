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
                if(scriptContext.type==scriptContext.UserEventType.CREATE){
                let newRecord = scriptContext.newRecord;
                    let recType = newRecord.type;
                    let id = newRecord.id;
                    let name=newRecord.getValue({
                            fieldId: 'entityid'
                        });
                    if (recType === record.Type.CUSTOMER ||
                        recType === record.Type.VENDOR ||
                        recType === record.Type.CONTACT) {
       
                        let userRec = runtime.getCurrentUser();
                        let receiver = userRec.id;
                        log.debug(receiver);
                        email.send({
                            author: -5,
                            body: `Entity type: ${recType}, Internal id:${id}, name:${name}`,
                            recipients: receiver,
                            subject: "Creation Scriptex Q3"
                        });
                    }
                }

                if(scriptContext.type==scriptContext.UserEventType.DELETE){
                    let oldRecord = scriptContext.oldRecord;
                    let recType = oldRecord.type;
                    let id= oldRecord.id;
                    let name=oldRecord.getValue({
                        fieldId: 'entityid'
                    });
                    if (recType === record.Type.CUSTOMER ||
                        recType === record.Type.VENDOR ||
                        recType === record.Type.CONTACT) {           
                        let userRec = runtime.getCurrentUser();
                        let receiver = userRec.id;
                        log.debug(receiver);
                        email.send({
                            author: -5,
                            body: `Entity type: ${recType}, Internal id:${id}, name:${name}`,
                            recipients: receiver,
                            subject: "Deletion Scriptex Q3"
                        });
                    }
                }
            }
            catch (error) {
                log.debug(error);
            }
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
