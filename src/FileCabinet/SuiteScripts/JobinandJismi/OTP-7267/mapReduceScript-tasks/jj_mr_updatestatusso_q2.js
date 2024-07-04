
// my code: 

/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/record', 'N/runtime', 'N/search', 'N/log', 'N/email'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 * @param{dialog} dialog
 */
    (record, runtime, search, log, email) => {
        /**
         * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
         * @param {Object} inputContext
         * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Object} inputContext.ObjectRef - Object that references the input data
         * @typedef {Object} ObjectRef
         * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
         * @property {string} ObjectRef.type - Type of the record instance that contains the input data
         * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
         * @since 2015.2
         */

        const getInputData = (inputContext) => {
            try {
                log.debug("hello from getinputdata()");
                let soSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: [
                        ['mainline', 'is', 'T'], 'AND', ['datecreated', 'within', 'thismonth'], 'AND', ['status', 'anyof', 'SalesOrd:A']
                    ],
                    columns: ['salesrep', 'internalid', 'entity']
                });
                return soSearch;
            } catch (error) {
                log.error('e in getinpudata(): ', error); 
            }
        }

        /**
         * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
         * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
         * context.
         * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
         *     is provided automatically based on the results of the getInputData stage.
         * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
         *     function on the current key-value pair
         * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
         *     pair
         * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} mapContext.key - Key to be processed during the map stage
         * @param {string} mapContext.value - Value to be processed during the map stage
         * @since 2015.2
         */

        const map = (mapContext) => {
            try {
                let result = JSON.parse(mapContext.value);
                let salesRep = result.values.salesrep ? result.values.salesrep.value : 'none';
                let soId = result.id;

                record.submitFields({
                    type: record.Type.SALES_ORDER,
                    id: soId,
                    values: {
                        orderstatus: 'B'
                    }
                });

                mapContext.write({
                    key: salesRep,
                    value: soId
                });
            } catch (error) {
             log.error('e in map(): ', error);
            }
        }

        /**
         * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered
         * automatically when the associated map stage is complete. This function is applied to each group in the provided context.
         * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter is
         *     provided automatically based on the results of the map stage.
         * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the
         *     reduce function on the current group
         * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
         * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} reduceContext.key - Key to be processed during the reduce stage
         * @param {List<String>} reduceContext.values - All values associated with a unique key that was passed to the reduce stage
         *     for processing
         * @since 2015.2
         */
        const reduce = (reduceContext) => {
            try {
                let salesRep = reduceContext.key;
                let salesOrders = reduceContext.values;

                log.debug('salesrep from reduce: ', salesRep);
                log.debug('salesOrders from reduce: ', salesOrders);

                if(salesRep == 'none'){
                    email.send({
                        author: -5,
                        body: `please assign sales rep to the so ${salesOrders}`,
                        recipients: -5,
                        subject: `no salesrep for sales orders ${salesOrders}`
                    });
                } else {
                    email.send({
                        author: -5,
                        body: `order status changed from pending approval to pending fullfilment ${salesOrders}`,
                        recipients: salesRep,
                        subject: `Order Status Changed ${salesOrders}`  
                    });
                }

            } catch (error) {
                log.debug('e in reduce: ', error);
            }
        }


        /**
         * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
         * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
         * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
         * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
         *     script
         * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
         * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Iterator} summaryContext.output - Serialized keys and values that were saved as output during the reduce stage
         * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
         * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce
         *     script
         * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
         * @param {Object} summaryContext.inputSummary - Statistics about the input stage
         * @param {Object} summaryContext.mapSummary - Statistics about the map stage
         * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
         * @since 2015.2
         */
        const summarize = (summaryContext) => {

        }

        return {getInputData, map, reduce, summarize}

    });
















// /**
//  * @NApiVersion 2.1
//  * @NScriptType MapReduceScript
//  */
// define(['N/log', 'N/record', 'N/search', 'N/email'],
//     /**
//      * @param{log} log
//      * @param{record} record
//      * @param{search} search
//      * @param{email} email
//      */
//     (log, record, search, email) => {
//         /**
//          * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
//          * @param {Object} inputContext
//          * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
//          *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
//          * @param {Object} inputContext.ObjectRef - Object that references the input data
//          * @typedef {Object} ObjectRef
//          * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
//          * @property {string} ObjectRef.type - Type of the record instance that contains the input data
//          * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
//          * @since 2015.2
//          */
 
//         const getInputData = (inputContext) => {
//             return search.create({
//                 type: search.Type.SALES_ORDER,
//                 filters: [
//                     ['status', 'anyof', 'SalesOrd:A'],
//                     'AND',
//                     ['mainline', 'is', 'T'],
//                     'AND',
//                     ['datecreated', 'within', 'thismonth']
//                 ],
//                 columns: ['salesrep', 'internalid', 'entity']
//             });
//         }
 
//         /**
//          * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
//          * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
//          * context.
//          * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
//          *     is provided automatically based on the results of the getInputData stage.
//          * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
//          *     function on the current key-value pair
//          * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
//          *     pair
//          * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
//          *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
//          * @param {string} mapContext.key - Key to be processed during the map stage
//          * @param {string} mapContext.value - Value to be processed during the map stage
//          * @since 2015.2
//          */
 
//         const map = (mapContext) => {
//             try {
//                 let result = JSON.parse(mapContext.value);
//                 let salesrep = result.values.salesrep ? result.values.salesrep.value : 'none';
//                 mapContext.write(salesrep, {
//                     id: result.id,
//                     customer: result.values.entity.value,
//                     salesrep: salesrep
//                 });
//             } catch (error) {
//                 log.error('Map Error', error);
//             }
//         }
 
//         /**
//          * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered automatically
//          * when the associated map stage is complete. This function is applied to each group in the provided context.
//          * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter
//          *     is provided automatically based on the results of the map stage.
//          * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the reduce
//          *     function on the current group
//          * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
//          * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
//          *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
//          * @param {string} reduceContext.key - Key to be processed during the reduce stage
//          * @param {string} reduceContext.value - Value to be processed during the reduce stage
//          * @since 2015.2
//          */
 
//         const reduce = (reduceContext) => {
//             try {
//                 let salesRepId = reduceContext.key;
//                 let salesOrders = [];
//                 reduceContext.values.forEach(value => {
//                     salesOrders.push(JSON.parse(value));
//                 });
 
//                 if (salesOrders.length > 0) {
//                     let emailBody = "The following sales orders have been approved and updated to Pending Fulfillment:\n\n";
//                     salesOrders.forEach(order => {
//                         emailBody += `Customer: ${order.customer}, Sales Order ID: ${order.id}\n`;
                       
//                         record.submitFields({
//                             type: record.Type.SALES_ORDER,
//                             id: order.id,
//                             values: {
//                                 orderstatus: "B"
//                             }
//                         });
//                     });

//                     let recipient = salesRepId !== 'none' ? salesRepId : -5;
//                     email.send({
//                         author: -5,
//                         recipients: recipient,
//                         subject: "Sales Orders Approved",
//                         body: emailBody
//                     });
//                 }
//             } catch (error) {
//                 log.error('Reduce Error', error);
//             }  
//         }
 
//         /**
//          * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
//          * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
//          * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
//          * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
//          *     script
//          * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
//          * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
//          *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
//          * @param {Iterator} summaryContext.output - Serialized errors that were thrown during previous attempts to execute the map
//          *     or reduce functions on the current key/value pairs
//          * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
//          * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce script
//          * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
//          * @param {Object} summaryContext.inputSummary - Statistics about the input stage
//          * @param {Object} summaryContext.mapSummary - Statistics about the map stage
//          * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
//          * @since 2015.2
//          */
 
//         const summarize = (summaryContext) => {
//             log.audit('Summary', {
//                 dateCreated: summaryContext.dateCreated,
//                 seconds: summaryContext.seconds,
//                 usage: summaryContext.usage,
//                 yields: summaryContext.yields
//             });
//             summaryContext.output.iterator().each((key, value) => {
//                 log.error('Error with key: ' + key, value);
//                 return true;
//             });
//         }
 
//         return { getInputData, map, reduce, summarize }
//     });











