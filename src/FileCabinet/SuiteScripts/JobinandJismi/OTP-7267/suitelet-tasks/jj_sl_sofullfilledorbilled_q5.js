/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/log', 'N/record', 'N/search', 'N/ui/serverWidget'],
 
    (log, record, search, serverWidget) => {
       
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                let filters = [
                    ['status', 'anyof', ['SalesOrd:B', 'SalesOrd:F']],
                    'AND',
                    ["taxline", "is", "F"],
                    'AND',
                    ["shipping", "is", "F"],
                    'AND',
                    ["cogs", "is", "F"],
                    'AND',
                    ['mainline', 'is', 'F'],
                ];
                let form = serverWidget.createForm({
                    title: 'Sales Order Search to be fulfilled or billed'
                });
   
                let sub = form.addField({
                    id: 'custpage_subsidiary_filter',
                    type: serverWidget.FieldType.SELECT,
                    source: 'subsidiary',
                    label: 'Subsidiary'
                });
   
                let customer = form.addField({
                    id: 'custpage_entity_filter',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customer',
                    label: 'Customer'
                });
                // if (scriptContext.request.parameters.custpage_subsidiary_filter) {
                //     filters.push('AND', ['subsidiary', 'anyof', scriptContext.request.parameters.custpage_subsidiary_filter]);
                // }
   
                // // Apply customer filter if provided
                // if (scriptContext.request.parameters.custpage_entity_filter) {
                //     filters.push('AND', ['entity', 'anyof', scriptContext.request.parameters.custpage_entity_filter]);
                // }
                let sublist = form.addSublist({
                    id: 'custpage_sublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders'
                });
   
                sublist.addField({
                    id: 'custompage_id',
                    label: 'Internal id',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_docid',
                    label: 'Document number',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_date',
                    label: 'Order date',
                    type: serverWidget.FieldType.DATE
                });
   
                sublist.addField({
                    id: 'custompage_status',
                    label: 'Status',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_name',
                    label: 'Customer Name',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_subsidiary',
                    label: 'Subsidiary',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_dept',
                    label: 'Department',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_class',
                    label: 'Class',
                    type: serverWidget.FieldType.TEXT
                });
 
                sublist.addField({
                    id: 'custompage_lineno',
                    label: 'Line Number',
                    type: serverWidget.FieldType.TEXT
                });
                // sublist.addField({
                //     id: 'custompage_subtotal',
                //     label: 'SubTotal',
                //     type: serverWidget.FieldType.TEXT
                // });
                // sublist.addField({
                //     id: 'custompage_tax',
                //     label: 'Tax',
                //     type: serverWidget.FieldType.TEXT
                // });
                sublist.addField({
                    id: 'custompage_total',
                    label: 'Total',
                    type: serverWidget.FieldType.TEXT
                });
   
                // Apply subsidiary filter if provided
               
   
                let salesSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    columns: [
                        'internalid',
                        'tranid',
                        'trandate',
                        'status',
                        'entity',
                        'subsidiary',
                        'department',
                        'class',
                        'line',
                        // {name: 'subtotal', summary: 'sum'},
                        // {name: 'taxtotal', summary: 'sum'},
                        {name: 'total'}
                    ],
                    filters: filters,
                    title: 'Sales Order Record for pending fulfillment and billing'
                });
   
                let i = 0;
                salesSearch.run().each(function(result) {
                    sublist.setSublistValue({
                        id: 'custompage_id',
                        line: i,
                        value: result.getValue({ name: 'internalid' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_docid',
                        line: i,
                        value: result.getValue({ name: 'tranid' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_date',
                        line: i,
                        value: result.getValue({ name: 'trandate' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_status',
                        line: i,
                        value: result.getText({ name: 'status' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_name',
                        line: i,
                        value: result.getText({ name: 'entity' }) || "N/A"
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_subsidiary',
                        line: i,
                        value: result.getText({ name: 'subsidiary' }) || "N/A"
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_dept',
                        line: i,
                        value: result.getText({ name: 'department' }) || "N/A"
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_class',
                        line: i,
                        value: result.getText({ name: 'class' }) || "N/A"
                    });
                    sublist.setSublistValue({
                        id: 'custompage_lineno',
                        line: i,
                        value: result.getValue({ name: 'line'})
                    });
                    // sublist.setSublistValue({
                    //     id: 'custompage_subtotal',
                    //     line: i,
                    //     value: result.getValue({ name: 'subtotal' }) || 0
                    // });
                    // sublist.setSublistValue({
                    //     id: 'custompage_tax',
                    //     line: i,
                    //     value: result.getValue({ name: 'tax' }) || 0
                    // });
                    sublist.setSublistValue({
                        id: 'custompage_total',
                        line: i,
                        value: result.getValue({ name: 'total'}) || 0
                    });
                    i++;
                    return true;
                });
                form.addSubmitButton({
                    label: 'Submit'
                });
                scriptContext.response.writePage(form);
            }
            else{
                let filters = [
                    ['status', 'anyof', ['SalesOrd:B', 'SalesOrd:F']],
                    'AND',
                    ["taxline", "is", "F"],
                    'AND',
                    ["shipping", "is", "F"],
                    'AND',
                    ["cogs", "is", "F"],
                    'AND',
                    ['mainline', 'is', 'F'],
                ];
                let form = serverWidget.createForm({
                    title: 'Sales Order Search to be fulfilled or billed'
                });
   
                let sub = form.addField({
                    id: 'custpage_subsidiary_filter',
                    type: serverWidget.FieldType.SELECT,
                    source: 'subsidiary',
                    label: 'Subsidiary'
                });
                log.error(filters);
                let customer = form.addField({
                    id: 'custpage_entity_filter',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customer',
                    label: 'Customer'
                });
                if (scriptContext.request.parameters.custpage_subsidiary_filter) {
                    filters.push('AND', ['subsidiary', 'anyof', scriptContext.request.parameters.custpage_subsidiary_filter]);
                }
   
                // Apply customer filter if provided
                if (scriptContext.request.parameters.custpage_entity_filter) {
                    filters.push('AND', ['entity', 'anyof', scriptContext.request.parameters.custpage_entity_filter]);
                }
                let sublist = form.addSublist({
                    id: 'custpage_sublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders'
                });
   
                sublist.addField({
                    id: 'custompage_id',
                    label: 'Internal id',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_docid',
                    label: 'Document number',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_date',
                    label: 'Order date',
                    type: serverWidget.FieldType.DATE
                });
   
                sublist.addField({
                    id: 'custompage_status',
                    label: 'Status',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_name',
                    label: 'Customer Name',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_subsidiary',
                    label: 'Subsidiary',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_dept',
                    label: 'Department',
                    type: serverWidget.FieldType.TEXT
                });
   
                sublist.addField({
                    id: 'custompage_class',
                    label: 'Class',
                    type: serverWidget.FieldType.TEXT
                });
 
                sublist.addField({
                    id: 'custompage_lineno',
                    label: 'Line Number',
                    type: serverWidget.FieldType.TEXT
                });
                // sublist.addField({
                //     id: 'custompage_subtotal',
                //     label: 'SubTotal',
                //     type: serverWidget.FieldType.TEXT
                // });
                // sublist.addField({
                //     id: 'custompage_tax',
                //     label: 'Tax',
                //     type: serverWidget.FieldType.TEXT
                // });
                sublist.addField({
                    id: 'custompage_total',
                    label: 'Total',
                    type: serverWidget.FieldType.TEXT
                });
   
                // Apply subsidiary filter if provided
               
   
                let salesSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    columns: [
                        'internalid',
                        'tranid',
                        'trandate',
                        'status',
                        'entity',
                        'subsidiary',
                        'department',
                        'class',
                        'line',
                        // {name: 'subtotal', summary: 'sum'},
                        // {name: 'taxtotal', summary: 'sum'},
                        {name: 'total'}
                    ],
                    filters: filters,
                    title: 'Sales Order Record for pending fulfillment and billing'
                });
   
                let i = 0;
                salesSearch.run().each(function(result) {
                    sublist.setSublistValue({
                        id: 'custompage_id',
                        line: i,
                        value: result.getValue({ name: 'internalid' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_docid',
                        line: i,
                        value: result.getValue({ name: 'tranid' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_date',
                        line: i,
                        value: result.getValue({ name: 'trandate' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_status',
                        line: i,
                        value: result.getText({ name: 'status' })
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_name',
                        line: i,
                        value: result.getText({ name: 'entity' }) || "N/A"
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_subsidiary',
                        line: i,
                        value: result.getText({ name: 'subsidiary' }) || "N/A"
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_dept',
                        line: i,
                        value: result.getText({ name: 'department' }) || "N/A"
                    });
   
                    sublist.setSublistValue({
                        id: 'custompage_class',
                        line: i,
                        value: result.getText({ name: 'class' }) || "N/A"
                    });
                    sublist.setSublistValue({
                        id: 'custompage_lineno',
                        line: i,
                        value: result.getValue({ name: 'line'})
                    });
                    // sublist.setSublistValue({
                    //     id: 'custompage_subtotal',
                    //     line: i,
                    //     value: result.getValue({ name: 'subtotal' }) || 0
                    // });
                    // sublist.setSublistValue({
                    //     id: 'custompage_tax',
                    //     line: i,
                    //     value: result.getValue({ name: 'tax' }) || 0
                    // });
                    sublist.setSublistValue({
                        id: 'custompage_total',
                        line: i,
                        value: result.getValue({ name: 'total'}) || 0
                    });
                    i++;
                    return true;
                });
                form.addSubmitButton({
                    label: 'Submit'
                });
                scriptContext.response.writePage(form);
 
            }
        }
   
        return { onRequest };
   
    });
   
 
 