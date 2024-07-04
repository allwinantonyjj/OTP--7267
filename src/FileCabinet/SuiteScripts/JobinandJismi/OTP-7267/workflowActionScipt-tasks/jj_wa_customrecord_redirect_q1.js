/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {
            try {
                // let customRec = record.create({
                //     type: 'customrecord_jj_workflowactionscript_q1'
                // });
                // customRec.setValue({
                //     filedId: 'custrecord_jj_name_wa_q1',
                //     value: scriptContext.newRecord.getValue({
                //         fieldId: 'title'
                //     })
                // });
                // customRec.setValue({
                //     filedId: 'custrecord_jj_testfield_wa_q1',
                //     value: 'sample test value'
                // });
    
                // let customRecId = customRec.save({
                //     enableSourcing: true,
                //     ignoreMandatoryFields: true
                // });
    
                // return customRecId;

                var taskRecord = scriptContext.newRecord;
       
                // Create the custom record
                var customRecord = record.create({
                    type: 'customrecord_jj_workflowactionscript_q1'
                });
                customRecord.setValue({
                    fieldId: 'custrecord_jj_name_wa_q1',
                    value: taskRecord.getValue('title') // example, setting name field to task title
                });
                customRecord.setValue({
                    fieldId: 'custrecord_jj_testfield_wa_q1',
                    value: 'Test Value' // example value
                });
                var customRecordId = customRecord.save();
         
                return customRecordId;

            } catch (error) {
                log.error('e:', error);
            }
        }

        return {onAction};
    });
