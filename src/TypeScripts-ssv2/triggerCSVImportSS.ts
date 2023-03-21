/**
 * triggerCSVImportSS.ts
 * 
 * @NScriptName Trigger CSV Import - Scheduled
 * @NScriptType ScheduledScript
 * @NApiVersion 2.1
 */

import file = require('N/file');
import log = require('N/log');
import runtime = require('N/runtime');
import task = require('N/task');

export function execute() {
    const mappingId = runtime.getCurrentScript().getParameter({ name: 'custscript_trigger_csv_import_mapping_id' }) as string;
    const fileId    = runtime.getCurrentScript().getParameter({ name: 'custscript_trigger_csv_import_file'       }) as string;
    log.debug('execute', `Processing file ${fileId} with import ${mappingId}.`);
    const importFile = file.load({ id: fileId });
    task.create({ taskType: task.TaskType.CSV_IMPORT, importFile, mappingId }).submit();
    log.audit('execute', 'Execution Complete');
}
