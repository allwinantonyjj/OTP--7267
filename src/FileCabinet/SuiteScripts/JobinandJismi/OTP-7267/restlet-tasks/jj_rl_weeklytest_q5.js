/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/currentRecord', 'N/record', 'N/search'],
    /**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{search} search
 */
    (currentRecord, record, search) => {
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
                let id = requestParams.id;

                let creditMemo = record.load({
                    type: record.Type.CREDIT_MEMO,
                    id: id,
                    isDynamic: true
                });
                let name = creditMemo.getText({fieldId: 'entity'});
                let subs = creditMemo.getText({fieldId: 'subsidiary'});
                let salesRep = creditMemo.getText({fieldId: 'salesrep'});
                let location = creditMemo.getText({fieldId: 'location'});
                return('Customer Name: '+ name + ', Subsidiary'+ subs + ', SalesRep: ' + salesRep + ', location: ' + location);
            } catch (error) {
                return('Does not exist', error);
            }
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
            try {
                let id = requestBody.id;
                let invoiceRec = record.load({
                    type: record.Type.INVOICE,
                    id: id,
                    isDynamic: true
                });
                invoiceRec.setValue({
                    fieldId: 'memo',
                    value: requestBody.memo
                });
                invoiceRec.setValue({
                    fieldId: 'salesrep',
                    value: requestBody.salesRep
                });
                invoiceRec.setValue({
                    fieldId: 'location',
                    value: requestBody.location
                });
                
                let invoiceId = invoiceRec.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });

                return `${invoiceId} memo, salesrep, location fields updated successfully`

            } catch (error) {
                return 'error occured while updating invoice', error;
            }
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
            try {
                let newCashSale = record.create({
                    type: record.Type.CASH_SALE,
                    isDynamic: true,
                    // defaultValues: Object
                });
                newCashSale.setValue({
                    fieldId: 'entity',
                    value: requestBody.customer
                });
                newCashSale.setValue({
                    fieldId: 'location',
                    value: requestBody.location
                });
                newCashSale.selectNewLine({
                    sublistId: 'item'
                });
                newCashSale.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: requestBody.item,
                });
                newCashSale.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: requestBody.item,
                });
                let newCashSaleId = newCashSale.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });

                return `new cash sale record id: ${newCashSaleId}`;
            } catch (error) {
                return 'error in creating cash sale code',error
            }
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
            let id=requestParams.id;
            record.delete({
                type: record.Type.EMPLOYEE,
                id: id
            });
            return(`employee record of id: ${id} deleted successfully`);
        }

        return {get, put, post, delete: doDelete}

    });
