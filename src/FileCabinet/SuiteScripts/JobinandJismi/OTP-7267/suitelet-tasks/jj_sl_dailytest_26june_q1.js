/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if(scriptContext.request.method == 'GET') {
                let form = serverWidget.createForm({
                    title: 'Registration Form',
                    hideNavBar: true
                });
                let primaryInfo = form.addFieldGroup({
                    id: 'primary-info',
                    label: 'Primary Information',
                    // tab: string
                });
                let name = form.addField({
                    id: 'name',
                    label: 'Name',
                    type: serverWidget.FieldType.TEXT,
                    // source: string,
                    container: 'primary-info'
                });
                name.isMandatory = true;
                let age = form.addField({
                    id: 'age',
                    label: 'Age',
                    type: serverWidget.FieldType.INTEGER,
                    container: 'primary-info'
                });
                let contactInfo = form.addFieldGroup({
                    id: 'contact-info',
                    label: 'Contact information',
                });
                let phoneNum = form.addField({
                    id: 'phone',
                    label: 'Phone number',
                    type: serverWidget.FieldType.PHONE,
                    container: 'contact-info'
                });
                let email = form.addField({
                    id: 'email',
                    label: 'Email',
                    type: serverWidget.FieldType.EMAIL,
                    container: 'contact-info'
                });
                let fatherName = form.addField({
                    id: 'father',
                    label: "Father's Name",
                    type: serverWidget.FieldType.TEXT,
                    container: 'contact-info'
                });
                let address = form.addField({
                    id: 'address',
                    label: 'Address',
                    type: serverWidget.FieldType.TEXTAREA,
                    container: 'contact-info'
                });
    
                let submitBtn = form.addSubmitButton({
                    label: 'Submit'
                });
                
                scriptContext.response.writePage(form);

            } else if(scriptContext.request.method == 'POST') {
                let name = scriptContext.request.parameters.name;
                let age = scriptContext.request.parameters.age;
                let phone = scriptContext.request.parameters.phone;
                let email = scriptContext.request.parameters.email;
                let father = scriptContext.request.parameters.father;
                let address = scriptContext.request.parameters.address;

                let customRec = record.create({
                    type: 'customrecord_jj_dailytest_26june',
                    isDynamic: true
                });
                customRec.setValue({
                    fieldId: 'custrecord_jj_name',
                    value: name
                });
                customRec.setValue({
                    fieldId: 'custrecord_jj_age',
                    value: age
                });
                customRec.setValue({
                    fieldId: 'custrecord_jj_phone',
                    value: phone
                });
                customRec.setValue({
                    fieldId: 'custrecord_jj_email',
                    value: email
                });
                customRec.setValue({
                    fieldId: 'custrecord_jj_father',
                    value: father
                });
                customRec.setValue({
                    fieldId: 'custrecord_jj_address',
                    value: address
                });

                customRec.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });

                scriptContext.response.write('Customer information submitted successfully!<br>');
                scriptContext.response.write('Name: ' + name + '<br>');
                scriptContext.response.write('Age: ' + age + '<br>');
                scriptContext.response.write('Email: ' + email + '<br>');
                scriptContext.response.write('Phone: ' + phone + '<br>');
                scriptContext.response.write('Father Name: ' + father + '<br>');
                scriptContext.response.write('address: ' + address + '<br>');
            }
        }

        return {onRequest}

    });
