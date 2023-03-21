/// <reference path="../../node_modules/@hitc/netsuite-types/SuiteScriptV1.d.ts" />
/// <reference path="../../node_modules/@hitc/netsuite-types/EmailCapturePlugin.d.ts" />

function process(email) {
    nlapiLogExecution('debug', 'process', `Email received with subject: ${email.getSubject()}`);
    const attachments = email.getAttachments();
    for (const i in attachments) {
        const file = attachments[i];
        nlapiLogExecution('debug', 'process', `Processing attachment: ${file.getName()}.`);
        file.setFolder(-14); // Attachments Received
        const fileId = nlapiSubmitFile(file);
        nlapiLogExecution('debug', 'process', `Saved file: ${fileId}.`);
        const custscript_trigger_csv_import_mapping_id = 'custimport_14_t1264278_294'; // TODO: Use your own saved CSV Import!
        nlapiScheduleScript('customscript_trigger_csv_import_schedule', '', { custscript_trigger_csv_import_file: fileId,  custscript_trigger_csv_import_mapping_id });
    }
}