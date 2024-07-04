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
            try {
                let filters = [
                    ['subsidiary', 'is', 1],
                    'AND',
                    ['datecreated', 'is', 'lastMonth']
                ]
                let columns = ['companyname', 'subsidiary', 'salesrep', 'email', 'datecreated']
                let custSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: filters,
                    // filterExpression: Object[],
                    columns: columns,
                    // packageId: string,
                    // settings: search.Setting | search.Setting[] | Object | Object[] | string | string[],
                    title: 'ParentSubsidiaryCustomers in previous month JJ',
                    // id: string,
                    isPublic: true
                });
                
                let searchResults = custSearch.run();
                let results = searchResults.getRange({
                    start: 0,
                    end: 1000
                });
                results.forEach((result) => {
                    let custName = result.getValue({ name: 'companyname' });
                    let subName = result.getText({ name: 'subsidiary' });
                    let salesRep = result.getValue({ name: 'salesrep' });
                    let email = result.getValue({ name: 'email' });
                    let createdDate = result.getValue({ name: 'datecreated' });

                    log.debug({
                        title: 'customer search done',
                        details: ' name: ' + custName + ' , subsidiary: ' + subName + ' , salesRep: ' + salesRep + ' , email: ' + email + ' , date created: ' + createdDate
                    });
    
                });
                // let custSearchId = custSearch.save({
                //     enableSourcing: true,
                //     ignoreMandatoryFields: true
                // });

            } catch (error) {
                log.debug({
                    title: 'error occured',
                    details: 'error msg: ' + error
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

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
