/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/currentRecord', 'N/email', 'N/log', 'N/record', 'N/runtime', 'N/search', 'N/ui/serverWidget'],
    /**
     * @param {currentRecord} currentRecord
     * @param {email} email
     * @param {log} log
     * @param {record} record
     * @param {runtime} runtime
     * @param {search} search
     * @param {serverWidget} serverWidget
     */
    (currentRecord, email, log, record, runtime, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {







            // if (scriptContext.request.method === 'GET') {
            //     let form = serverWidget.createForm({
            //         title: 'Custom Form for question 1'
            //     });
            //     const fname = form.addField({
            //         id: 'fname',
            //         type: serverWidget.FieldType.TEXT,
            //         label: 'First Name'
            //     });
            //     const lname = form.addField({
            //         id: 'lname',
            //         type: serverWidget.FieldType.TEXT,
            //         label: 'Last Name'
            //     });
            //     const email = form.addField({
            //         id: 'email',
            //         type: serverWidget.FieldType.EMAIL,
            //         label: 'Email'
            //     });
            //     const phone = form.addField({
            //         id: 'phone',
            //         type: serverWidget.FieldType.PHONE,
            //         label: 'Phone'
            //     });
            //     const dob = form.addField({
            //         id: 'dob',
            //         type: serverWidget.FieldType.TEXT,
            //         label: 'Date of Birth'
            //     });
            //     form.addSubmitButton({
            //         label: 'Submit'
            //     });
            //     scriptContext.response.writePage(form);
            // }
            // else if (scriptContext.request.method === 'POST') {
            //     var data = scriptContext.request;
            //     let fname = data.parameters.fname;
            //     let lname = data.parameters.lname;
            //     let email = data.parameters.email;
            //     let phone = data.parameters.phone;
            //     let dob = data.parameters.dob;
            //     let searchresult=search.create({
            //         type: search.Type.CUSTOMER,
            //         filters: ['email','is',email],
            //         columns: ['internalid','email','salesrep']
            //     });
            //     let manager="";
            //     searchresult.run().each(function(result){
            //         manager=result.getText('salesrep');
            //     })
            //     log.error(manager);
            //     let custrec=record.create({
            //         type: 'customrecord_jj_summative_q1',
            //         isDynamic: true
            //     });
            //     custrec.setValue({
            //         fieldId: 'custrecord1421',
            //         value: fname,
            //         ignoreFieldChange: true
            //     });
            //     custrec.setValue({
            //         fieldId: 'custrecord1422',
            //         value: lname,
            //         ignoreFieldChange: true
            //     });
            //     custrec.setValue({
            //         fieldId: 'custrecord1423',
            //         value: email,
            //         ignoreFieldChange: true
            //     });
            //     custrec.setValue({
            //         fieldId: 'custrecord1424',
            //         value: phone,
            //         ignoreFieldChange: true
            //     });
            //     custrec.setValue({
            //         fieldId: 'custrecord1425',
            //         value: dob,
            //         ignoreFieldChange: true
            //     });
            //     custrec.setValue({
            //         fieldId: 'custrecord1426',
            //         value: manager,
            //         ignoreFieldChange: true
            //     });
            //     let id=custrec.save({
            //         enableSourcing: true,
            //         ignoreMandatoryField: true
            //     });
            //     scriptContext.response.write(`A custom record with id ${id} has been created.`);
            // }







            if (scriptContext.request.method === 'GET') {
                try {
                    let form = serverWidget.createForm({
                        title: 'User Information',
                        hideNavBar: true
                    });
                    
                    form.addField({
                        id: 'custpage_jj_fname',
                        label: 'First Name: ',
                        type: serverWidget.FieldType.TEXT
                    });
                    
                    form.addField({
                        id: 'custpage_jj_lname',
                        label: 'Last Name: ',
                        type: serverWidget.FieldType.TEXT
                    });
                    
                    form.addField({
                        id: 'custpage_jj_email',
                        label: 'Email: ',
                        type: serverWidget.FieldType.EMAIL
                    }).isMandatory = true;
                    
                    form.addField({
                        id: 'custpage_jj_dob',
                        label: 'Date of Birth',
                        type: serverWidget.FieldType.DATE
                    });
                    
                    form.addField({
                        id: 'custpage_jj_salesrep',
                        label: 'Account Manager (salesrep): ',
                        type: serverWidget.FieldType.TEXT
                    });

                    form.addSubmitButton({
                        label: 'Submit'
                    });

                    scriptContext.response.writePage(form);
                } catch (error) {
                    log.debug('Error in GET request: ', error);
                }
            } else if (scriptContext.request.method === 'POST') {
                let fname = scriptContext.request.parameters.custpage_jj_fname;
                let lname = scriptContext.request.parameters.custpage_jj_lname;
                let emailAddr = scriptContext.request.parameters.custpage_jj_email;
                let dob = scriptContext.request.parameters.custpage_jj_dob;
                let salesRep = scriptContext.request.parameters.custpage_jj_salesrep;

                try {
                    let newRec = record.create({
                        type: 'customrecord_jj_userinfo_q1',
                        isDynamic: true
                    });
                    newRec.setValue({
                        fieldId: 'custrecord_jj_fname_userinfo_q1',
                        value: fname
                    });
                    newRec.setValue({
                        fieldId: 'custrecord_jj_lname_userinfo_q1',
                        value: lname
                    });
                    newRec.setValue({
                        fieldId: 'custrecord_jj_email_userinfo_q1',
                        value: emailAddr
                    });
                    newRec.setValue({
                        fieldId: 'custrecord_jj_dob_userinfo_q1',
                        value: dob
                    });

                    try {
                        let searchCust = search.create({
                            type: search.Type.CUSTOMER,
                            columns: ['email', 'salesrep'],
                            title: 'Customer Search Summative Q1 JJ',
                            id: '_jj_summative_q1',
                        });
                        let searchResults = searchCust.run();
                        let flag = 0;
                        searchResults.each(function (obj) {
                            if (obj.getValue('email') === emailAddr) {
                                flag = 1;
                                newRec.setValue({
                                    fieldId: 'custrecord_jj_salesrep_userinfo_q1',
                                    value: obj.getText('salesrep')
                                });
                            }
                            return true;
                        });

                        if (flag === 0) {
                            newRec.setValue({
                                fieldId: 'custrecord_jj_salesrep_userinfo_q1',
                                value: salesRep
                            });
                        }
                    } catch (error) {
                        log.error('Error in search: ', error);
                    }

                    let newRecId = newRec.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });
                    log.debug('New record ID:', newRecId);
                } catch (error) {
                    log.error('Error in creating record:', error);
                }
            }
        };

        return { onRequest };
    });





























// /**
//  * @NApiVersion 2.1
//  * @NScriptType Suitelet
//  */
// define(['N/currentRecord', 'N/email', 'N/log', 'N/record', 'N/runtime', 'N/search', 'N/ui/serverWidget'],
//     /**
//  * @param{currentRecord} currentRecord
//  * @param{email} email
//  * @param{log} log
//  * @param{record} record
//  * @param{runtime} runtime
//  * @param{search} search
//  */
//     (currentRecord, email, log, record, runtime, search, serverWidget) => {
//         /**
//          * Defines the Suitelet script trigger point.
//          * @param {Object} scriptContext
//          * @param {ServerRequest} scriptContext.request - Incoming request
//          * @param {ServerResponse} scriptContext.response - Suitelet response
//          * @since 2015.2
//          */
//         const onRequest = (scriptContext) => {
//             if(scriptContext.request.method == 'GET') {
//                 try {
//                     let form = serverWidget.createForm({
//                         title: 'User Information',
//                         hideNavBar: true
//                     });
//                     let fname = form.addField({
//                         id: 'custpage_jj_fname',
//                         label: 'FIrst Name: ',
//                         type: serverWidget.FieldType.TEXT,
//                     });
//                     let lname = form.addField({
//                         id: 'custpage_jj_lname',
//                         label: 'Last Name: ',
//                         type: serverWidget.FieldType.TEXT,
//                     });
//                     let email = form.addField({
//                         id: 'custpage_jj_email',
//                         label: 'Email: ',
//                         type: serverWidget.FieldType.EMAIL
//                     }).isMandatory = true;
//                     let dob = form.addField({
//                         id: 'custpage_jj_dob',
//                         label: 'Date of Birth',
//                         type: serverWidget.FieldType.TEXT
//                     });
//                     let salesRep = form.addField({
//                         id: 'custpage_jj_salesrep',
//                         label: 'Account Manager (salesrep): ',
//                         type: serverWidget.FieldType.TEXT
//                     });
    
//                     form.addSubmitButton({
//                         label: 'Submit'
//                     });
    
//                     scriptContext.response.writePage( form );
//                 } catch (error) {
//                     log.debug('e in get: ', error)
//                 }
//             } else if( scriptContext.request.method == 'POST') {
//                 // let data = JSON.parse(scriptContext.request.body);
//                 let fname = scriptContext.request.parameters.custpage_jj_fname;
//                 let lname = scriptContext.request.parameters.custpage_jj_lname;
//                 let email = scriptContext.request.parameters.custpage_jj_email;
//                 let phno = scriptContext.request.parameters.custpage_jj_phno;
//                 let dob = scriptContext.request.parameters.custpage_jj_dob;
//                 let salesRep = scriptContext.request.parameters.custpage_jj_salesrep

//                 // log.debug('fname:', fname);
//                 // log.debug('lname', lname);
//                 // log.debug('email', email);
//                 // log.debug('phno', phno);
//                 // log.debug('salerep', salesRep);


//                 try {                    
//                     let newRec = record.create({
//                         type: 'customrecord_jj_userinfo_q1',
//                         isDynamic: true
//                     });
//                     newRec.setValue({
//                         fieldId: 'custrecord_jj_fname_userinfo_q1',
//                         value: fname
//                     });
//                     newRec.setValue({
//                         fieldId: 'custrecord_jj_lname_userinfo_q1',
//                         value: lname
//                     });
//                     newRec.setValue({
//                         fieldId: 'custrecord_jj_email_userinfo_q1',
//                         value: email
//                     });
//                     newRec.setValue({
//                         fieldId: 'custrecord_jj_phno_userinfo_q1',
//                         value: phno
//                     });
//                     newRec.setValue({
//                         fieldId: 'custrecord_jj_dob_userinfo_q1',
//                         value: dob
//                     });


//                     try {
//                         let searchCust = search.create({
//                             type: search.Type.CUSTOMER,
//                             // filters: [],
//                             columns: ['email', 'salesrep'],
//                             title: 'Customer Search Summative Q1 JJ',
//                             id: '_jj_summative_q1',
//                         });
//                         let searchResults = searchCust.run();
//                         let flag = 0;
//                         searchResults.each(function(obj){
//                             log.debug('rep', obj.getText({ name: 'salesrep' }));
//                             if(obj.getValue('email') == email){
//                                 flag = 1;
//                                 log.debug('flag: '+flag);
//                                 log.debug('email: ', obj.getValue('email'));
//                                 newRec.setValue({
//                                     fieldId: 'custrecord_jj_salesrep_userinfo_q1',
//                                     value: obj.getText('salesrep')
//                                 });
//                             }

//                             return true;
//                         });

//                         if(flag == 0) {
//                             newRec.setValue({
//                                 fieldId: 'custrecord_jj_salesrep_userinfo_q1',
//                                 value: salesRep
//                             });
//                         }

//                     } catch (error) {
//                         log.error('e in search: ', error)
//                     }


//                     let newRecId = newRec.save({
//                         enableSourcing: true,
//                         ignoreMandatoryFields: true
//                     });
//                     log.debug('newRecord id:', newRecId);

//                 } catch (error) {
//                     log.error('e in creating record:', error);
//                 }

//             }
//         }

//         return {onRequest}

//     });
