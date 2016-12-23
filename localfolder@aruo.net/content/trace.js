// namespace
if( !aruonet ){ var aruonet = {}; }
if( !aruonet.localfolder ){ aruonet.localfolder = {}; }

aruonet.localfolder.g_messages_localfolder = null;

//aruonet.localfolder.g_CodeErreur = 0;
//aruonet.localfolder.g_MSGERREUR = "";

aruonet.localfolder.ChargeMessagesLocalFolder = function(){
 aruonet.localfolder.g_messages_localfolder = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
 aruonet.localfolder.g_messages_localfolder = aruonet.localfolder.g_messages_localfolder.createBundle("chrome://localfolder/locale/localfolder.properties");
}
aruonet.localfolder.ChargeMessagesLocalFolder();

aruonet.localfolder.LocalFolderMessageFromId = function(msgid){
 return aruonet.localfolder.g_messages_localfolder.GetStringFromName(msgid);
}

aruonet.localfolder.LocalFolderAfficheMsgId = function(msgid){
 var msg = aruonet.localfolder.LocalFolderMessageFromId(msgid);
 var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
 promptService.alert(window, "", msg);
}

aruonet.localfolder.LocalFolderAfficheMsgId2 = function(msgid, msg2){
 var msg = aruonet.localfolder.LocalFolderMessageFromId(msgid);
 if( null != msg2 ) msg += "\n" + msg2;
 var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
 promptService.alert(window, "", msg);
}

//aruonet.localfolder.LocalFolderAfficheMsgIdGlobalErr = function(msgid){
// var msg = aruonet.localfolder.LocalFolderMessageFromId(msgid);
// msg += "\nCode:" + aruonet.localfolder.g_CodeErreur;
// msg += "\nMessage:" + aruonet.localfolder.g_MSGERREUR;
// var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
// promptService.alert(window, "", msg);
//}

//aruonet.localfolder.gLocalFolderConsole = null;
//aruonet.localfolder.LocalFolderInitTrace = function(){
// aruonet.localfolder.gLocalFolderConsole = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
//}
//aruonet.localfolder.LocalFolderInitTrace();
//aruonet.localfolder.LocalFolderTrace = function(msg){
// if( aruonet.localfolder.gLocalFolderConsole ){ aruonet.localfolder.gLocalFolderConsole.logStringMessage("localfolder " + msg); }
//}
