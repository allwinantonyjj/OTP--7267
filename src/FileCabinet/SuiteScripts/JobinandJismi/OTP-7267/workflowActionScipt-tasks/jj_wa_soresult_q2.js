/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
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
            let salesRec = scriptContext.newRecord;
            let number = salesRec.getValue('custbody_jj_number_wa_q2');
            if(number >= 100) {
                // salesRec.setValue({
                //     fieldId: 'custbodyjj_result_wa_q2',
                //     value: 'Result Passed'
                // });
                return 'Result Passed';
            } else {
                // salesRec.setValue({
                //     fieldId: 'custbodyjj_result_wa_q2',
                //     value: 'Result Failed'
                // });
                return 'Result Failed';
            }
        }

        return {onAction};
    });
