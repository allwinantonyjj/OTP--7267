/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/search', 'N/runtime'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 */
    (email, record, search, runtime) => {
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
            if(scriptContext.type !== scriptContext.UserEventType.CREATE){
                return;
            }
            try {
                if(scriptContext.newRecord.type == record.Type.SALES_ORDER){
                    // log.debug('entered if condition');
                    const custId = scriptContext.newRecord.getValue({
                        fieldId: 'entity'
                    });
                    // log.debug('past custId');
                    let openSOsearch = search.create({
                        type: record.Type.SALES_ORDER,
                        title: 'WeeklyAssessment Q1 JJ',
                        id: 'customsearch_jj_weeklyassessmentq1',
                        filters: [
                            ['entity', 'is', custId],
                            'AND',
                            ['status', 'anyof', 
                                ['SalesOrd:A', 'SalesOrd:B', 'SalesOrd:D', 'SalesOrd:E'] 
                            ]
                        ],
                        coloumn: [
                            search.createColumn({ name:'tranid', label:'Document number' })
                        ]
                    });
                    // log.debug('past create search')
                    let count = 0;
                    let searchResult = openSOsearch.run();
                    searchResult.each(function(obj){
                        count = count + 1;
                        return true;
                    });
                    log.debug('total count: ' + count);
                    if(count >= 5){
                        // log.debug('entered count>=5 condition');
                        let salesRepId = scriptContext.newRecord.getValue({ fieldId: 'salesrep' });
                    
                        email.send({
                            author: runtime.getCurrentUser().id,
                            recipients: salesRepId,
                            subject: 'Weekly assessment Question1 email ',
                            body: 'this is an email to let you know that customer ' + custId +' has 5 or more open sales orders'
                        });
                        log.debug('email sent successfully');
                    }
                }
            } catch (error) {
                log.debug('error msg:' +error)
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
