/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/**********************************************************************************
 * OTP-7415 : Search through the database to find the matching blood donors
 * 
 * 
 * ********************************************************************************
 * 
 * ********************
 * company name
 * 
 * Author: Jobin and Jismi IT Services
 * 
 * 
 * Date Created: 05-July-2024
 * 
 * Description: This script is for displaying the data in a custom record concurrently based on filters provided by the user in the custom form.
 * 
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 company name: 05-July-2024: Created the initial build by JJ0350
 * 
 * 
 * 
 **************/
define(['N/format', 'N/record', 'N/search', 'N/ui/serverWidget'],
    (format, record, search, serverWidget) => {
        const onRequest = (scriptContext) => {
            try {
                if (scriptContext.request.method === 'GET') {
                    // Creating form
                    let form = serverWidget.createForm({
                        title: 'Search Eligible Blood Donors',
                        hideNavBar: true
                    });
                    // Binding clientScript by its document id in file cabinet
                    form.clientScriptFileId = 300;

                    let filtersField = form.addFieldGroup({
                        id: 'custpage_jj_filterfield',
                        label: 'Filters'
                    });

                    // Adding fields to form
                    let blood = form.addField({
                        id: 'custpage_jj_blood',
                        label: 'Blood Group',
                        type: serverWidget.FieldType.SELECT,
                        container: 'custpage_jj_filterfield'
                    });
                    blood.addSelectOption({ value: '', text: 'Select Blood Group' });
                    blood.addSelectOption({ value: 1, text: 'A+' });
                    blood.addSelectOption({ value: 2, text: 'A-' });
                    blood.addSelectOption({ value: 3, text: 'B+' });
                    blood.addSelectOption({ value: 4, text: 'B-' });
                    blood.addSelectOption({ value: 5, text: 'O+' });
                    blood.addSelectOption({ value: 6, text: 'O-' });
                    blood.addSelectOption({ value: 7, text: 'AB+' });
                    blood.addSelectOption({ value: 8, text: 'AB-' });
                    blood.addSelectOption({ value: 9, text: 'Rh null' });

                    let lastDonation = form.addField({
                        id: 'custpage_jj_lastdon',
                        label: 'Last Donation Date',
                        type: serverWidget.FieldType.DATE,
                        container: 'custpage_jj_filterfield'
                    });

                    let sublist = form.addSublist({
                        id: 'custpage_jj_sublist',
                        label: 'Donor Details',
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
                        label: 'Last Donation Date',
                        type: serverWidget.FieldType.DATE
                    });

                    // Getting parameters from client
                    let displayBlood = scriptContext.request.parameters.clientBlood;
                    let displayLastDonation = scriptContext.request.parameters.clientLastDonation;

                    let date = new Date(displayLastDonation);

                    // Extract the day, month, and year
                    let day = String(date.getDate()).padStart(2, '0');
                    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    let year = date.getFullYear();

                    // Format the date as dd/mm/yyyy
                    let formattedDate = `${day}/${month}/${year}`;

                    log.debug('Parameters received', { displayBlood, displayLastDonation });

                    if (displayBlood || displayLastDonation) {
                        let filters = [];
                        if (displayBlood) {
                            log.error(formattedDate);
                            filters.push(['custrecord_jj_donor_blood', 'is', displayBlood], 'AND', ['custrecord_jj_donor_last_donation_date', 'before', formattedDate]);
                        }
                        log.error('filter', filters);
                        // if (formattedDate) {
                        //     filters.push('AND', ['custrecord_jj_donor_last_donation_date', 'before', formattedDate]);
                        // }
                        // log.error('Search Filters', filters);
                        let searchDonors = search.create({
                            type: 'customrecord_jj_blooddonorinfo',
                            filters: filters,
                            columns: [
                                'custrecord_jj_donor_fname',
                                'custrecord_jj_donor_phno',
                                'custrecord_jj_donor_last_donation_date'
                            ]
                        });

                        let searchResults = searchDonors.run();
                        let i = 0;
                        searchResults.each(function (obj) {
                            log.error('Search Result', obj);
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
                            // log.error(obj.getValue('custrecord_jj_donor_last_donation_date'));
                            i++;
                            return true;
                        });
                    }

                    // Write form
                    scriptContext.response.writePage(form);
                }
            } catch (error) {
                log.error('Error in Suitelet', error);
            }
        }
        return { onRequest }
    });


