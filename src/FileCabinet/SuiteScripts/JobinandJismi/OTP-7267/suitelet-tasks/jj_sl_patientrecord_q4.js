// /**
//  * @NApiVersion 2.1
//  * @NScriptType Suitelet
//  */
// define(['N/record', 'N/search', 'N/ui/serverWidget'],
//     /**
//  * @param{record} record
//  * @param{search} search
//  * @param{serverWidget} serverWidget
//  */
//     (record, search, serverWidget) => {
//         /**
//          * Defines the Suitelet script trigger point.
//          * @param {Object} scriptContext
//          * @param {ServerRequest} scriptContext.request - Incoming request
//          * @param {ServerResponse} scriptContext.response - Suitelet response
//          * @since 2015.2
//          */
//         const onRequest = (scriptContext) => {

//         }

//         return {onRequest}

//     });



/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (record, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                var form = serverWidget.createForm({
                    title: 'Patient Registration Form'
                });
                const nameField = form.addField({
                    id: 'custpage_jj_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });
                nameField.isMandatory = true;
                const ageField = form.addField({
                    id: 'custpage_jj_age',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Age'
                });
                ageField.isMandatory = true;
 
                const selectField = form.addField({
                    id: 'custpage_jj_sex',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Sex',
                    container: 'usergroup'
                });
                selectField.isMandatory = true;
 
 
                selectField.addSelectOption({
                    value: 'M',
                    text: 'M'
                });
                selectField.addSelectOption({
                    value: 'F',
                    text: 'F'
                });
                selectField.addSelectOption({
                    value: 'Others',
                    text: 'Others'
                });
 
                const addressField = form.addField({
                    id: 'custpage_jj_address',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Address'
                });
                addressField.isMandatory = true;
 
                form.addSubmitButton({
                    label: 'Submit'
                });
                scriptContext.response.writePage(form);
            }
            else if (scriptContext.request.method === 'POST') {
                var data = JSON.parse(scriptContext.request.body);
                log.debug('data',data)
                let name = data.custpage_jj_name;
                let age = data.custpage_jj_age;
                let address = data.custpage_jj_address;
                let sex = data.custpage_jj_sex;
                log.debug('name',name)

                var detailsHtml = '<h2>Patient Details</h2>';
                detailsHtml += '<p><b>Name:</b> ' + name + '</p>';
                detailsHtml += '<p><b>Age:</b> ' + age + '</p>';
                detailsHtml += '<p><b>Sex:</b> ' + sex + '</p>';
                detailsHtml += '<p><b>Address:</b> ' + address + '</p>';
 
                scriptContext.response.write(detailsHtml);
 
                var customRecId = createCustomRecord(name, age, sex, address);
                log.debug('customRecId', customRecId);
            }
        };
 
        function createCustomRecord(name, age, sex, address) {
            log.debug('name', name);
            var customRecord = record.create({ type: 'customrecord112', isDynamic: true });
            customRecord.setValue({
                fieldId: 'custrecord140',
                value: name
            });
            customRecord.setValue({
                fieldId: 'custrecord141',
                value: age
            });
            customRecord.setValue({
                fieldId: 'custrecord142',
                value: sex
            });
            customRecord.setValue({
                fieldId: 'custrecord143',
                value: address
            });
 
 
            var recordId = customRecord.save({ ignoreMandatoryFields: false, enableSourcing: true });
            log.debug("record id", recordId);
            return recordId;
        }

        return { onRequest };
 
    });