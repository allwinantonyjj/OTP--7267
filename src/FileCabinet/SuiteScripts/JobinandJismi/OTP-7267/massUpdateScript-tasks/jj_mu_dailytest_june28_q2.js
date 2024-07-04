/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {
            try {
                let customRec = record.load({
                    type: 'customrecord_jj_studentdetails',
                    id: params.id
                });
                let classId = parseInt(customRec.getValue({
                    fieldId: 'custrecord_jj_studentclass'
                }));

                log.debug("class: ",classId);
                if(classId != 10) {
                    record.submitFields({
                        type: params.type,
                        id: params.id,
                        values: {
                            custrecord_jj_studentclass : classId + 1 
                        }
                    });
                let completed = classId;
                } else if(classId == 10) {
                    let completed = classId+1;
                    record.submitFields({
                        type: params.type,
                        id: params.id,
                        values: { 
                            custrecord_jj_studentclass : completed
                        }
                    });
                }
            } catch (error) {
                log.debug(error);
            }
        }

        return {each}

    });
