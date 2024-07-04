/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/record'],
    /**
 * @param{serverWidget} serverWidget
 */
    (serverWidget, record) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                // Create the form
                let form = serverWidget.createForm({
                    title: 'Customer Information Form'
                });
   
                // Add fields to the form
                form.addField({
                    id: 'custpage_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                }).isMandatory = true;
   
                form.addField({
                    id: 'custpage_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                }).isMandatory = true;
   
                form.addField({
                    id: 'custpage_phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone'
                }).isMandatory = true;
   
                form.addField({
                    id: 'custpage_salesrep',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Sales Rep',
                    source: 'employee'
                }).isMandatory = true;
   
                form.addField({
                    id: 'custpage_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary'
                }).isMandatory = true;
   
                // Add a submit button
                form.addSubmitButton({
                    label: 'Submit'
                });
   
                // Write the form to the response
                scriptContext.response.writePage(form);
            } else {
                // Handle the form submission
                let request = scriptContext.request;
                let name = request.parameters.custpage_name;
                let email = request.parameters.custpage_email;
                let phone = request.parameters.custpage_phone;
                let salesRep = request.parameters.custpage_salesrep;
                let subsidiary = request.parameters.custpage_subsidiary;
   
                // Create a new customer record
                let customerRecord = record.create({
                    type: record.Type.CUSTOMER,
                    isDynamic: true
                });
   
                customerRecord.setValue({
                    fieldId: 'companyname',
                    value: name
                });
   
                customerRecord.setValue({
                    fieldId: 'email',
                    value: email
                });
   
                customerRecord.setValue({
                    fieldId: 'phone',
                    value: phone
                });
   
                customerRecord.setValue({
                    fieldId: 'salesrep',
                    value: salesRep
                });
   
                customerRecord.setValue({
                    fieldId: 'subsidiary',
                    value: subsidiary
                });
   
                let customerId = customerRecord.save();
   
                // Display the submitted details and created customer record id
                scriptContext.response.write('Customer information submitted successfully!<br>');
                scriptContext.response.write('Name: ' + name + '<br>');
                scriptContext.response.write('Email: ' + email + '<br>');
                scriptContext.response.write('Phone: ' + phone + '<br>');
                scriptContext.response.write('Sales Rep: ' + salesRep + '<br>');
                scriptContext.response.write('Subsidiary: ' + subsidiary + '<br>');
                scriptContext.response.write('Customer Record ID: ' + customerId + '<br>');
            }
            // if(scriptContext.request.method === 'GET'){
            //     scriptContext.response.writePage(form);
            //     var form = serverWidget.createForm({
            //         title: ' Customer Information Form'
            //     });
            //     var usergroup=form.addFieldGroup({
            //         id: 'usergroup',
            //         label: "Customer info",
                   
            //     })
            //     var name=form.addField({
            //         id: "namefield",
            //         label: "customer Name",
            //         type: serverWidget.FieldType.TEXT,
            //         container: "usergroup"
            //     })
            //     var email=form.addField({
            //         id: "emailfield",
            //         label: "customer email",
            //         type: serverWidget.FieldType.TEXT,
            //         container: "usergroup"
            //     })
            //     var subsidiary=form.addField({
            //         id: "subsidiaryfield",
            //         label: "customer subsidiary",
            //         type: serverWidget.FieldType.SELECT,
            //         source:"subsidiary",
            //         container: "usergroup"
            //     })
            //     var phone=form.addField({
            //         id: "phonefield",
            //         label: "customer salesrep",
            //         type: serverWidget.FieldType.TEXT,
            //         container: "usergroup"
            //     })
            //     var salesrep=form.addField({
            //         id: "salesrepfield",
            //         label: "customer salesrep",
            //         type: serverWidget.FieldType.SELECT,
            //         source:"employee",
            //         container: "usergroup"
            //     })
            // } else if (scriptContext.request.method === 'POST') {
            //     var request = scriptContext.request;
            //     var name = request.parameters.custpage_name;
            //     var email = request.parameters.custpage_email;
            //     var phone = request.parameters.custpage_phone;
            //     var salesRep = request.parameters.custpage_salesrep;
            //     var subsidiary = request.parameters.custpage_subsidiary;
     
            //     var customerRecord = record.create({
            //         type: record.Type.CUSTOMER,
            //         isDynamic: true
            //     });
     
            //     customerRecord.setValue({
            //         fieldId: 'companyname',
            //         value: name
            //     });
     
            //     customerRecord.setValue({
            //         fieldId: 'email',
            //         value: email
            //     });
     
            //     customerRecord.setValue({
            //         fieldId: 'phone',
            //         value: phone
            //     });
     
            //     customerRecord.setValue({
            //         fieldId: 'salesrep',
            //         value: salesRep
            //     });
     
            //     customerRecord.setValue({
            //         fieldId: 'subsidiary',
            //         value: subsidiary
            //     });
     
            //     var customerId = customerRecord.save();
     
            //     var form = serverWidget.createForm({
            //         title: 'Customer Information Submitted'
            //     });
     
            //     form.addField({
            //         id: 'custpage_info',
            //         type: serverWidget.FieldType.INLINEHTML,
            //         label: 'Information'
            //     }).defaultValue = '<p>Customer record created successfully with ID: ' + customerId + '</p>' +
            //                       '<p>Name: ' + name + '</p>' +
            //                       '<p>Email: ' + email + '</p>' +
            //                       '<p>Phone: ' + phone + '</p>' +
            //                       '<p>Sales Rep: ' + salesRep + '</p>' +
            //                       '<p>Subsidiary: ' + subsidiary + '</p>';
     
            //     scriptContext.response.writePage(form);
            // }
        }

        return {onRequest}

    });