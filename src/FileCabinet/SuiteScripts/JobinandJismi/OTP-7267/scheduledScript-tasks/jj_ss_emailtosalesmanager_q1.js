/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search', 'N/email'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search, email) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            let searchSo = search.create({
                type: search.Type.SALES_ORDER,
                filters: [['mainline', 'is', 'T'], 'AND', ['trandate', 'is', 'lastmonth']],
                columns: ['tranid', 'trandate', 'entity', 'subsidiary', 'total'],
                title: 'Previous month Sales Orders JJ',
                id: '_jj_prevmonthsales',
                isPublic: true
            });

            let searchResults = searchSo.run();
            let soDetails = "";
            searchResults.each(function (obj) {
                var trannum = obj.getValue('tranid');
                var trandate = obj.getValue('trandate');
                var custName = obj.getValue('entity');
                var subs = obj.getValue('subsidiary');
                var total = obj.getValue('total');

                soDetails += `trannumber: ${trannum}, trandate: ${trandate}, customer: ${custName}, subsidiary: ${subs}, total: ${total} \n \n`
                return true;
            });

            let salesRepRec = record.load({
                type: record.Type.EMPLOYEE,
                id: 155,
                isDynamic: true,
            });
            let manager = salesRepRec.getValue({
                fieldId: 'supervisor'
            });

            log.debug('supervisor: ', manager);
            email.send({
                author: 155,
                body: soDetails,
                recipients: manager,
                subject: 'Scheduled task1 Answer'
            });


        }

        return { execute }

    });
