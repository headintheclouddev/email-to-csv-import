/**
 * triggerCSVImportSS.ts
 *
 * @NScriptName Trigger CSV Import - Scheduled
 * @NScriptType ScheduledScript
 * @NApiVersion 2.1
 */
define(["require", "exports", "N/file", "N/log", "N/runtime", "N/task"], function (require, exports, file, log, runtime, task) {
    "use strict";
    exports.__esModule = true;
    exports.execute = void 0;
    function execute() {
        var mappingId = runtime.getCurrentScript().getParameter({ name: 'custscript_trigger_csv_import_mapping_id' });
        var fileId = runtime.getCurrentScript().getParameter({ name: 'custscript_trigger_csv_import_file' });
        log.debug('execute', "Processing file ".concat(fileId, " with import ").concat(mappingId, "."));
        var importFile = file.load({ id: fileId });
        task.create({ taskType: task.TaskType.CSV_IMPORT, importFile: importFile, mappingId: mappingId }).submit();
        log.audit('execute', 'Execution Complete');
    }
    exports.execute = execute;
});
