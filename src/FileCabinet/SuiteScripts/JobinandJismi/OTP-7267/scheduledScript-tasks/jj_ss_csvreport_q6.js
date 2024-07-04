/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/file', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{file} file
 * @param{record} record
 * @param{search} search
 */
    (email, file, record, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try {
                let searchRec = search.create({
                    type: search.Type.CUSTOMER,
                    filters: ['datecreated', 'within', 'thismonth'],
                    columns: ['entityid', 'datecreated', 'salesrep', 'terms']
                });
                let details = 'Name, Date, Salesrep, Terms\n'
                searchRec.run().each(function (result) {
                    let entityid = result.getValue('entityid');
                    let date = result.getValue('datecreated');
                    let salesrep = result.getText('salesrep');
                    let terms = result.getText('terms');
                    details += `${entityid},${date},${salesrep},${terms}\n`
                    return true;
                });
                let csvFile = file.create({
                    name: "New Customers",
                    fileType: file.Type.CSV,
                    contents: details,
                    folder: 11
                });
                let fileId = csvFile.save();
                log.error("file Id:" + fileId + " is created");
            } catch (error) {
                log.debug('e:', error);
            }
        }

        return { execute }

    });
