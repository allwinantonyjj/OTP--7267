/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {

            try {
                let salesOrderId = requestParams.id;
                if (!salesOrderId) {
                    return {status: 'error', message: 'Sales Order ID is required'};
                }
 
                try {
                    let salesOrder = record.load({
                        type: record.Type.SALES_ORDER,
                        id: salesOrderId
                    });
                    
 
                    let salesOrderData = {
                        id: salesOrderId,
                        entity: salesOrder.getValue('entity'),
                        tranDate: salesOrder.getValue('trandate'),
                        status: salesOrder.getValue('status'),
                        total: salesOrder.getValue('total'),
                        items: []
                    };
 
                    let itemCount = salesOrder.getLineCount({ sublistId: 'item' });
                    if(itemCount>2){
                        var updated="Item count is greater than 2"
                    }
                    else{
                      var updated="Item count less than 2"
                    }
                    for (let i = 0; i < itemCount; i++) {
                        salesOrderData.items.push({
                            item: salesOrder.getSublistValue({ sublistId: 'item', fieldId: 'item', line: i }),
                            quantity: salesOrder.getSublistValue({ sublistId: 'item', fieldId: 'quantity', line: i }),
                            rate: salesOrder.getSublistValue({ sublistId: 'item', fieldId: 'rate', line: i }),
                            amount: salesOrder.getSublistValue({ sublistId: 'item', fieldId: 'amount', line: i })
                        });
                    }
                 
                   
 
                    return {salesOrderData,updated} ;
               
                } catch (e) {
                    return {status: 'error', message: 'Does not exist'};
                }
            } catch (e) {
                log.error({title: 'Error in RESTlet GET', details: e});
                return {status: 'error', message: 'An error occurred while processing the request'};
            }

/*            let id=requestParams.id;
            try{
            let salesRec=record.load({
                type: record.Type.SALES_ORDER,
                id: id,
                isDynamic: true                
            });
            const itemCount = salesRec.getLineCount({
                sublistId: 'item'
            });
            let data="";
            if(itemCount>1){
                data="Sales order contains more than one item .";
                for(let i=0;i<itemCount;i++){
                let itemName=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item_display',
                    line: i
                });
                let q=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });
                let rate=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: i
                });
                let amt=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'grossamt',
                    line: i
                });
                log.debug(itemName);
                data+=" item:"+itemName+" quantity:"+q+" rate:"+rate+" amount:"+amt;
                }
                log.debug(data);
                return(data);
            }
            else{
                let itemName=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'item_display',
                    line: 0
                });
                let q=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: 0
                });
                let rate=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: 0
                });
                let amt=salesRec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'grossamt',
                    line: 0
                });
                data+=" item:"+itemName+" quantity:"+q+" rate:"+rate+" amount:"+amt;
                return(data);
                }
 
            }
            catch(error){
                return(error);
            } */

/*            try {              
                let recId = requestParams.id;
                if(recId){
                    let salesRec = record.load({
                        type: record.Type.SALES_ORDER,
                        id: recId,
                        isDynamic: true
                    });
                    
                    let itemCount = salesRec.getLineCount({ sublistId: 'item' });
                    let items = [];
                    let quantity = [];
                    let rate = [];
                    let amount = []
                    let msg = ""
                    let count = 0;

                    for(let i=0; i<=itemCount; i++){
                        count = count+1
                        items = salesRec.getSublistText({
                            sublistId: 'item',
                            fieldId: 'item',
                            line: i
                        });
                        quantity = salesRec.getSublistText({
                            sublistId: 'item',
                            fieldId: 'quantity',
                            line: i
                        });
                        rate = salesRec.getSublistText({
                            sublistId: 'item',
                            fieldId: 'rate',
                            line: i
                        });
                        amount = salesRec.getSublistText({
                            sublistId: 'item',
                            fieldId: 'amount',
                            line: i
                        });
                    }
                    if(count>2){
                        msg = "Sales order contains more than 2 items";
                        log.debug(', item name: ' +items + 'quantity: ' +quantity + 'rate: ' +rate + 'amount: ' +amount);
                        return ('message: ' +msg + ', item name: ' +items + 'quantity: ' +quantity + 'rate: ' +rate + 'amount: ' +amount);
                    }
                    return ('item name: ' +items + 'quantity: ' +quantity + 'rate: ' +rate + 'amount: ' +amount);
                }
     
            } catch (error) {
                log.debug("error msg: " +error);
                return('Record does not exist' +error);
            } */
           
        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return {get, put, post, delete: doDelete}

    });
