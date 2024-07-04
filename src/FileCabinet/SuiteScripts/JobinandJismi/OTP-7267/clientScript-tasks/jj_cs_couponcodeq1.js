/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/ui/dialog'],
    /**
     * @param{record} record
     * @param{search} search
     * @param{dialog} dialog
     */
    function(record, search, dialog) {
        
        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {
            let couponCodeField = scriptContext.currentRecord.getField({
                fieldId: 'custentity_jj_couponcode'
            });
            couponCodeField.isDisabled = true;
        }
    
        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {
            try {
                let custRec = scriptContext.currentRecord;
                let fieldId = scriptContext.fieldId;
                if (fieldId === 'custentity_jj_applycoupon') {
                    let applyCouponfieldValue = custRec.getValue({ fieldId: 'custentity_jj_applycoupon' });
                    let couponCodeField = custRec.getField({ fieldId: 'custentity_jj_couponcode' });
    
                    if (applyCouponfieldValue) {
                        couponCodeField.isDisabled = false;
                    } else {
                        custRec.setValue({ fieldId: 'custentity_jj_couponcode', value: '' });
                        couponCodeField.isDisabled = true;
                    }
                }
            } catch (error) {
                log.debug('Error in fieldChanged:', error);
            }
        }
    
        /**
         * Validation function to be executed when record is saved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @returns {boolean} Return true if record is valid
         *
         * @since 2015.2
         */
        function saveRecord(scriptContext) {
            let custRec = scriptContext.currentRecord;
            let applyCouponfieldValue = custRec.getValue({ fieldId: 'custentity_jj_applycoupon' });
            let coupcode = custRec.getValue({ fieldId: 'custentity_jj_couponcode' });
    
            try {
                if (applyCouponfieldValue) {
                    if (!coupcode || coupcode.length !== 5) {
                        dialog.alert({
                            title: 'Error',
                            message: 'Coupon code must be exactly 5 characters long.',
                        });
                        return false;
                    }
                }
                return true;
            } catch (error) {
                log.debug('Error in saveRecord:', error);
                return false;
            }
        }
    
        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            saveRecord: saveRecord
        };
    });

    
    









// /**
//  * @NApiVersion 2.1
//  * @NScriptType ClientScript
//  * @NModuleScope SameAccount
//  */
// define(['N/record', 'N/search', 'N/ui/dialog'],
// /**
//  * @param{record} record
//  * @param{search} search
//  */
// function(record, search, dialog) {
    
//     /**
//      * Function to be executed after page is initialized.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
//      *
//      * @since 2015.2
//      */
//     function pageInit(scriptContext) {
//         // let couponCodeField = scriptContext.currentRecord.getField({
//         //     fieldId: 'custentity_jj_couponcode'
//         // });
//         // couponCodeField.isDisabled = true;
//     }

//     /**
//      * Function to be executed when field is changed.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      * @param {string} scriptContext.fieldId - Field name
//      * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
//      * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
//      *
//      * @since 2015.2
//      */
//     function fieldChanged(scriptContext) {
//         try {
//             let custRec = scriptContext.currentRecord;
//             let couponCodeField = custRec.getField({
//                 fieldId: 'custentity_jj_couponcode'
//             });
//             let applyCouponfieldValue = custRec.getValue({
//                 fieldId: 'custentity_jj_applycoupon'
//             });
//             // log.debug(applyCouponfieldValue);
//             if(applyCouponfieldValue){
//                 custRec.setValue({
//                     fieldId: 'custentity_jj_couponcode',
//                     value: ''
//                 })
//                 couponCodeField.isDisabled = false;
//             } else {
//                 couponCodeField.isDisabled = true;
//             }
//         } catch (error) {
//             log.debug(error);
//             console.log(error);
//         }

//     }

//     /**
//      * Function to be executed when field is slaved.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      * @param {string} scriptContext.fieldId - Field name
//      *
//      * @since 2015.2
//      */
//     function postSourcing(scriptContext) {

//     }

//     /**
//      * Function to be executed after sublist is inserted, removed, or edited.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      *
//      * @since 2015.2
//      */
//     function sublistChanged(scriptContext) {

//     }

//     /**
//      * Function to be executed after line is selected.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      *
//      * @since 2015.2
//      */
//     function lineInit(scriptContext) {

//     }

//     /**
//      * Validation function to be executed when field is changed.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      * @param {string} scriptContext.fieldId - Field name
//      * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
//      * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
//      *
//      * @returns {boolean} Return true if field is valid
//      *
//      * @since 2015.2
//      */
//     function validateField(scriptContext) {

//     }

//     /**
//      * Validation function to be executed when sublist line is committed.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      *
//      * @returns {boolean} Return true if sublist line is valid
//      *
//      * @since 2015.2
//      */
//     function validateLine(scriptContext) {
        
//     }

//     /**
//      * Validation function to be executed when sublist line is inserted.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      *
//      * @returns {boolean} Return true if sublist line is valid
//      *
//      * @since 2015.2
//      */
//     function validateInsert(scriptContext) {

//     }

//     /**
//      * Validation function to be executed when record is deleted.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @param {string} scriptContext.sublistId - Sublist name
//      *
//      * @returns {boolean} Return true if sublist line is valid
//      *
//      * @since 2015.2
//      */
//     function validateDelete(scriptContext) {

//     }

//     /**
//      * Validation function to be executed when record is saved.
//      *
//      * @param {Object} scriptContext
//      * @param {Record} scriptContext.currentRecord - Current form record
//      * @returns {boolean} Return true if record is valid
//      *
//      * @since 2015.2
//      */
//     function saveRecord(scriptContext) {
//         // try {
//         //     let custRec = scriptContext.currentRecord;
//         //     let fieldId = scriptContext.fieldId;
//         //     if ( fieldId == 'custentity_jj_couponcode') {
//         //             let couponCodeValue = custRec.getValue({
//         //                 fieldId: 'custentity_jj_couponcode'
//         //             });
//         //             if(couponCodeValue.length < 5){
//         //                 dialog.alert({
//         //                     title: 'value error',
//         //                     message: 'coupon code must have atleast 5 digits'
//         //                 });
//         //                 return false;
//         //             } else {
//         //                 return true;
//         //             }
//         //     }
//         // } catch (error) {
//         //     log.debug("error in saveRecord code" +error);
//         //     console.log("error in saveRecord code" +error);
//         // }

//         let custRec =scriptContext.currentRecord;
//         let applyCouponfieldValue = custRec.getValue({
//             fieldId: 'custentity_jj_applycoupon'
//         });
//         let coupcode = custRec.getValue({
//             fieldId:'custentity_jj_couponcode'
//         }); 
//         try {
//             if(applyCouponfieldValue == true){
//                 if(coupcode.length !==5)
//                 {
//                     dialog.alert({
//                         title: 'Error',
//                         message: 'Coupon code must be 5 charecter long',
//                     });
//                     return false;
//                 }
//                 return true;
//             }
//         } catch (error) {
//             log.debug('error occured: ' +error);
//             console.log("saveRecord error"+error);
//         }

//     }

//     return {
//         pageInit: pageInit,
//         fieldChanged: fieldChanged,
//         saveRecord: saveRecord
//         /*postSourcing: postSourcing,
//         sublistChanged: sublistChanged,
//         lineInit: lineInit,
//         validateField: validateField.
//         validateLine: validateLine,
//         validateInsert: validateInsert,
//         validateDelete: validateDelete,*/
//     };
    
// });
