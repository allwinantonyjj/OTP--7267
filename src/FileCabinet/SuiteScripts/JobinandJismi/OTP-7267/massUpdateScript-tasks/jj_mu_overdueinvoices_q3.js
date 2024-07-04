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
                let invoice = record.load({
                    type: params.type,
                    id: params.id,
                    isDynamic: true,
                });

                let dueDate = invoice.getValue({
                    fieldId: 'duedate'
                });

                if(dueDate) {
                    let newdate = new Date();
                    invoice.setValue({
                        fieldId: 'duedate',
                        value: newdate.setDate((newdate + 10)),
                        ignoreFieldChange: boolean
                    });
                } else {
                    invoice.setValue({
                        fieldId: 'duedate',
                        value: newdate.setDate((newDate + 2)),
                        ignoreFieldChange: boolean
                    });
                }
            } catch (error) {
                log.error('e in main code: ', error)
            }
        }

        return {each}

    });
