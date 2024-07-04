/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/**********************************************************************************
 * OTP-7414 : Custom form to store blood donor details and track them in database
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
 * Date Created: 02-July-2024
 * 
 * Description: This script is for storing blood donors information in a custom record using custom data entry form.
 * 
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 company name: 02-July-2024: Created the initial build by JJ0350
 * 
 * 
 * 
 **************/

define(['N/record', 'N/search', 'N/ui/serverWidget', 'N/format'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget, format) => {
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
                    title: 'Blood Donor Details',
                    hideNavBar: true
                });
                let fname = form.addField({
                    id: 'custpage_jj_fname',
                    label: 'First Name',
                    type: serverWidget.FieldType.TEXT
                });
                let lname = form.addField({
                    id: 'custpage_jj_lname',
                    label: 'Last Name',
                    type: serverWidget.FieldType.TEXT
                });
                let gender = form.addField({
                    id: 'custpage_jj_gender',
                    label: 'Gender',
                    type: serverWidget.FieldType.SELECT
                });
                gender.addSelectOption({
                    value: 1,
                    text: 'Male'
                });
                gender.addSelectOption({
                    value: 2,
                    text: 'Female'
                });
                gender.addSelectOption({
                    value: 3,
                    text: 'Others'
                });
                let phno = form.addField({
                    id: 'custpage_jj_phone',
                    label: 'Phone Number',
                    type: serverWidget.FieldType.PHONE
                });
                let blood = form.addField({
                    id: 'custpage_jj_blood',
                    label: 'Blood Group',
                    type: serverWidget.FieldType.SELECT
                });
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
                    type: serverWidget.FieldType.DATE
                });

                form.addSubmitButton({
                    label: 'Submit'
                });

                scriptContext.response.writePage(form);
            } else if(scriptContext.request.method == 'POST') {
                let fname = scriptContext.request.parameters.custpage_jj_fname;
                let lname = scriptContext.request.parameters.custpage_jj_lname;
                let gender = scriptContext.request.parameters.custpage_jj_gender;
                let phno = scriptContext.request.parameters.custpage_jj_phone;
                let blood = scriptContext.request.parameters.custpage_jj_blood;
                let lastDonation = scriptContext.request.parameters.custpage_jj_lastdon;

                log.debug(fname+ lname + "gender is: " + gender + phno + blood + lastDonation);

                let newRec = record.create({
                    type: 'customrecord_jj_blooddonorinfo',
                    isDynamic: true
                });
                newRec.setValue({ 
                    fieldId: 'custrecord_jj_donor_fname',
                    value: fname
                });
                newRec.setValue({ 
                    fieldId: 'custrecord_jj_donor_lname',
                    value: lname
                });                
                newRec.setValue({ 
                    fieldId: 'custrecord_jj_donor_gender',
                    value: gender
                });
                newRec.setValue({
                    fieldId: 'custrecord_jj_donor_phno',
                    value: phno
                });
                newRec.setValue({
                    fieldId: 'custrecord_jj_donor_blood',
                    value: blood
                });

                // Convert the date to MM/DD/YYYY format
                let formattedDate = format.parse({
                    value: lastDonation,
                    type: format.Type.DATE
                });

                newRec.setValue({
                    fieldId: 'custrecord_jj_donor_last_donation_date',
                    value: formattedDate
                });

                let newRecId = newRec.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
                log.debug('new record id: ', newRecId);

                let printGender = 'Male'
                if(gender == 2) {
                    printGender = 'Female'
                } else if(gender == 3) {
                    printGender = 'Others'
                }

                let printBlood = 'A+'
                if(blood == 2) {
                    printBlood = 'A-'
                } else if(blood == 3) {
                    printBlood = 'B+'
                }  else if(blood == 4) {
                    printBlood = 'B-'
                } else if(blood == 5) {
                    printBlood = 'O+'
                } else if(blood == 6) {
                    printBlood = 'O-'
                } else if(blood == 7) {
                    printBlood = 'AB+'   
                } else if(blood == 8) {
                    printBlood = 'AB-'
                } else if(blood == 9) {
                    printBlood = 'Rh null'
                }
                scriptContext.response.write('Customer information submitted successfully!<br>');
                scriptContext.response.write('First Name: ' + fname + '<br>');
                scriptContext.response.write('Last Name: ' + lname + '<br>');
                scriptContext.response.write('Gender: ' + printGender + '<br>');
                scriptContext.response.write('Phone: ' + phno + '<br>');
                scriptContext.response.write('Blood Group: ' + printBlood + '<br>');
                scriptContext.response.write('Last Donation Dat: ' + formattedDate + '<br>');
            }
            
        }

        return {onRequest}

    });
    