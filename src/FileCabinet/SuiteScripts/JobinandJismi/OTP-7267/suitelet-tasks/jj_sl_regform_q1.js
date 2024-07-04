/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if(scriptContext.request.method === 'GET'){
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
            } 
        }

        return {onRequest}

    });
