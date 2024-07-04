/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define([],
    /**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{search} search
 */
    () => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            let html = '<html><body><h1>Hello World</h1></body><html>';
            scriptContext.response.write(html);
            // scriptContext.response.setHeader({
            //     name: 'Custom-Header-Demo',
            //     value: 'Demo'
            // });
        }

        return {onRequest}

    });
