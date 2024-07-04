/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/format', 'N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{format} format
 * @param{record} record
 * @param{search} search
 */
    (format, record, search, serverWidget) => {
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
                    title: 'Search Eligible Blood Donors',
                    hideNavBar: true
                });
                let filtersField = form.addFieldGroup({
                    id: 'custpage_jj_filterfield',
                    label: 'Filters',
                    // tab: string
                })
                let blood = form.addField({
                    id: 'custpage_jj_blood',
                    label: 'Blood Group',
                    type: serverWidget.FieldType.SELECT,
                    container: 'custpage_jj_filterfield'
                });
                // blood.addSelectOption({ 
                //     value: '', 
                //     text: '' 
                // });
                blood.addSelectOption({
                    value: 1,
                    text: 'A+'
                });
                blood.addSelectOption({
                    value: 2,
                    text: 'A-'
                });
                blood.addSelectOption({
                    value: 3,
                    text: 'B+'
                });
                blood.addSelectOption({
                    value: 4,
                    text: 'B-'
                });
                blood.addSelectOption({
                    value: 5,
                    text: 'O+'
                });
                blood.addSelectOption({
                    value: 6,
                    text: 'O-'
                });
                blood.addSelectOption({
                    value: 7,
                    text: 'AB+'
                });
                blood.addSelectOption({
                    value: 8,
                    text: 'AB-'
                });
                blood.addSelectOption({
                    value: 9,
                    text: 'Rh null'
                });
                let lastDonation = form.addField({
                    id: 'custpage_jj_lastdon',
                    label: 'Last donation date',
                    type: serverWidget.FieldType.DATE,
                    container: 'custpage_jj_filterfield'
                });
                // let sublist = form.addSublist({
                //     id: 'custpage_jj_sublist',
                //     label: 'Donor details',
                //     type: serverWidget.SublistType.LIST
                // });
                // sublist.addField({
                //     id: 'custpage_jj_name',
                //     label: 'Donor Name',
                //     type: serverWidget.FieldType.TEXT
                // });
                // sublist.addField({
                //     id: 'custpage_jj_phone',
                //     label: 'Phone Number',
                //     type: serverWidget.FieldType.PHONE
                // });
                // sublist.addField({
                //     id: 'custpage_jj_lastdon',
                //     label: 'Last donation date',
                //     type: serverWidget.FieldType.DATE
                // });

                form.addSubmitButton({
                    label: 'Submit'
                })
                scriptContext.response.writePage(form);
            } else if(scriptContext.request.method == 'POST') {
                let blood = scriptContext.request.parameters.custpage_jj_blood;
                let lastDonation = scriptContext.request.parameters.custpage_jj_lastdon;
                log.debug('group: '+ blood + 'date: ' +lastDonation);

                let searchDonors = search.create({
                    type: 'customrecord_jj_blooddonorinfo',
                    filters: [
                        ['custrecord_jj_donor_blood', 'is', blood],
                        ['custpage_jj_lastdon', 'onorbefore', lastDonation]
                    ],
                    columns: [
                        'custrecord_jj_donor_fname',
                        'custrecord_jj_donor_phno',
                        'custrecord_jj_donor_last_donation_date'
                    ],
                    title: 'Blood Donors Details Search JJ',
                    id: '_jj_displaydonors'
                });

                let form = serverWidget.createForm({
                    title: 'Search Eligible Blood Donors',
                    // hideNavBar: boolean
                });
                let sublist = form.addSublist({
                    id: 'custpage_jj_sublist',
                    label: 'Donor details',
                    type: serverWidget.SublistType.LIST
                });
                sublist.addField({
                    id: 'custpage_jj_name',
                    label: 'Donor Name',
                    type: serverWidget.FieldType.TEXT
                });
                sublist.addField({
                    id: 'custpage_jj_phone',
                    label: 'Phone Number',
                    type: serverWidget.FieldType.PHONE
                });
                sublist.addField({
                    id: 'custpage_jj_lastdon',
                    label: 'Last donation date',
                    type: serverWidget.FieldType.DATE
                });

                let searchResults = searchDonors.run();
                let i = 0;
                searchResults.each(function(obj) {
                    sublist.setSublistValue({
                        id: 'custpage_jj_name',
                        line: i,
                        value: obj.getValue('custrecord_jj_donor_fname')
                    });
                    sublist.setSublistValue({
                        id: 'custpage_jj_phone',
                        line: i,
                        value: obj.getValue('custrecord_jj_donor_phno')
                    });
                    sublist.setSublistValue({
                        id: 'custpage_jj_lastdon',
                        line: i,
                        value: obj.getValue('custrecord_jj_donor_last_donation_date')
                    });
                    
                    i++;
                    return true;
                });
            }
        }

        return {onRequest}

    });
