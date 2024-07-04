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
            try{
                let columns = [
                    search.createColumn({ name: 'entityid', label: 'Vendor Name' }),
                    search.createColumn({ name: 'subsidiary', label: 'Subsidiary' })
                ];
 
                let searchVendor = search.create({
                    title: 'SuiteScript Vendor Search JJ',
                    id: 'customsearch_jj_suitescriptvendorsearch',
                    type: search.Type.VENDOR,
                    columns: columns
                });

                searchResult = searchVendor.run();
                searchResult.each(function (obj) {
                    let vendorName = obj.getValue({ name: 'entityid' });
                    let subs = obj.getValue({ name: 'subsidiary' });
 
                    log.debug('Vendor Name: ' + vendorName + ' Subsidiary: ' + subs);
 
                    return true;
 
                });
 
            }
            catch(error){
                log.debug({
                    title: 'error occured',
                    details: 'error msg: '+error
                });
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
