// namespace
if( !aruonet ){ var aruonet = {}; }
if( !aruonet.localfolder ){ aruonet.localfolder = {}; }

aruonet.localfolder.OnInitLocalFolder = function(){
 try{
  var elem = document.getElementById("accountActionsDropdownSep1");
  var bt = document.getElementById("accountActionAddLocalFolder");
  elem.parentNode.insertBefore(bt, elem);
 }
 catch(ex){
  aruonet.localfolder.LocalFolderAfficheMsgId2("ErreurAppelLocalFolder", ex);
 }
}

aruonet.localfolder.isLocalFolder = function(){
 let account = getCurrentAccount();
 if( account ){
  let server = account.incomingServer;
  if( server.type == "none" ){ // "none" is localfolder
   let am = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
   let localfolder = am.localFoldersServer;
   if( localfolder != server ){ return true; }
  }
 }
 return false;
}

aruonet.localfolder.initAccountActionsButtonsLocalFolder = function(menupopup){
 initAccountActionsButtons(menupopup);
 if( aruonet.localfolder.isLocalFolder() ){
  document.getElementById("accountActionsDropdownRemove").removeAttribute("disabled");
 }
}

aruonet.localfolder.onSupprimeCompte = function(e){
 try{
  if( !aruonet.localfolder.isLocalFolder() ){
   onRemoveAccount(e);
  }
  else{
   var account = currentAccount;
   var server = account.incomingServer;
   var type = server.type;
   var prettyName = server.prettyName;
   var bundle = document.getElementById("bundle_prefs");
   var confirmRemoveAccount = bundle.getFormattedString("confirmRemoveAccount", [prettyName]);
   var confirmTitle = bundle.getString("confirmRemoveAccountTitle");
   var promptService =Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);

   if( !promptService.confirm(window, confirmTitle, confirmRemoveAccount) ){ return; }

   try {
    currentAccount = currentPageId = null;
    var serverId = server.serverURI;
    Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager).removeAccount(account);
    if(serverId in accountArray){ delete accountArray[serverId]; }
    selectServer(null, null);
   }
   catch (ex){
    dump("failure to remove account: " + ex + "\n");
    var alertText = bundle.getString("failedRemoveAccount");
    Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService).alert(window, null, alertText);
   }
  }
 }
 catch(ex){
  aruonet.localfolder.LocalFolderAfficheMsgId2("LocalFolderMajErreurEffCompte", ex);
  return false;
 }
 return true;
}

aruonet.localfolder.NewLocalFolder = function(){
 window.openDialog("chrome://localfolder/content/localfolder.xul","","chrome,modal,center,titlebar,resizable=no");
 return true;
}

window.addEventListener("load",aruonet.localfolder.OnInitLocalFolder,false);
