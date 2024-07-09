/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
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
define(['N/currentRecord', 'N/url', 'N/ui/dialog', 'N/log'],
    function (currentRecord, url, dialog, log) {
        function fieldChanged(scriptContext) {
            let bloodDonorRec = scriptContext.currentRecord;

            if (scriptContext.fieldId === 'custpage_jj_blood' || scriptContext.fieldId === 'custpage_jj_lastdon') {
                try {
                    let blood = bloodDonorRec.getValue('custpage_jj_blood');
                    let lastDonation = bloodDonorRec.getValue('custpage_jj_lastdon');

                    log.debug('Field Changed', { blood, lastDonation });

                    if (lastDonation && !(isDateBeforeThreeMonths(lastDonation))) {
                        dialog.alert({
                            title: 'Invalid Date',
                            message: 'Last donation date must be at least three months before today.'
                        });
                        return false;
                    }

                    let suiteletUrl = url.resolveScript({
                        deploymentId: 'customdeploy_jj_sl_otp7415_jira_task2',
                        scriptId: 'customscript_jj_sl_otp7415_jira_task2',
                        params: {
                            clientBlood: blood,
                            clientLastDonation: lastDonation
                        }
                    });

                    log.debug('Suitelet URL', suiteletUrl);

                    if (blood && lastDonation) {
                        window.location.href = suiteletUrl;
                    }
                } catch (error) {
                    log.error('Error in Client Script', error);
                }
            }
        }

        function isDateBeforeThreeMonths(selectedDate) {
            let currentDate = new Date();
            let threeMonthsAgo = new Date();
            threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
            let selected = new Date(selectedDate);
            return selected < threeMonthsAgo;
        }

        return {
            fieldChanged: fieldChanged
        };
    });