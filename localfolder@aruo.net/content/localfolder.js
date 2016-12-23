// namespace
if( !aruonet ){ var aruonet = {}; }
if( !aruonet.localfolder ){ aruonet.localfolder = {}; }

aruonet.localfolder.initDlg = function(){
 document.getElementById("localfoldernom").focus();
}

aruonet.localfolder.btCreeDossierLocal = function(){
 try{
  var nom = document.getElementById("localfoldernom").value;
  if( nom == "" ){
   aruonet.localfolder.LocalFolderAfficheMsgId("NomPasRenseigne");
   return false;
  }

  var accountmanager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
  var serveurs = accountmanager.allServers;

  for(var i = 0; i < serveurs.length; i++){
   var srv = serveurs.queryElementAt(i, Components.interfaces.nsIMsgIncomingServer);
   if( nom == srv.prettyName ){
    aruonet.localfolder.LocalFolderAfficheMsgId("DossierExisteDeja");
    return false;
   }
  }

  var dossier = document.getElementById("localfolderchemin").value;
  if( dossier == "" ){
   aruonet.localfolder.LocalFolderAfficheMsgId("DossierPasRenseigne");
   return false;
  }
  aruonet.localfolder.creeDossierLocal(nom, dossier);
 }
 catch(ex){
  aruonet.localfolder.LocalFolderAfficheMsgId2("ErreurCreationDossier", ex);
  window.close();
  return false;
 }

 window.close();
 return true;
}

aruonet.localfolder.SelectChemin = function(){
 try{
  var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(Components.interfaces.nsIFilePicker);
  var courant = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);
  var selection = document.getElementById("localfolderchemin");

  fp.init(window, document.getElementById("localfoldercheminbtsel").getAttribute("localfolderchemin.browsertitle"), Components.interfaces.nsIFilePicker.modeGetFolder);
  fp.displayDirectory = courant;

  var ret = fp.show();

  if( ret == Components.interfaces.nsIFilePicker.returnOK ){
   selection.value = fp.file.path;

   var bValid = aruonet.localfolder.ValidRepLocal(fp.file);
   if( false == bValid ){
    aruonet.localfolder.LocalFolderAfficheMsgId("RepNonValide");
    return false;
   }

   var accountmanager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
   var serveurs = accountmanager.allServers;

   for(var i = 0; i < serveurs.length; i++){
    var srv = serveurs.queryElementAt(i, Components.interfaces.nsIMsgIncomingServer); // introduce with TB 20
    var chemin = srv.localPath.nativePath;

    if( fp.file.path.toLowerCase() == chemin.toLowerCase() ){
     aruonet.localfolder.LocalFolderAfficheMsgId("RepertoireDejaUtilise");
     return false;
    }
   }

   selection.value = fp.file.path;
  }
 }
 catch(ex){
  return false;
 }

 return true;
}

aruonet.localfolder.creeDossierLocal = function(nom, chemin){
 try{
  var accountmanager = Components.classes["@mozilla.org/messenger/account-manager;1"].getService(Components.interfaces.nsIMsgAccountManager);
  var srv = accountmanager.createIncomingServer("nobody", nom, "none");
  var filespec = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);

  filespec.initWithPath(chemin);
  srv.prettyName = nom;
  srv.localPath = filespec;

  var account = accountmanager.createAccount();
  account.incomingServer = srv;

  return account;
 }
 catch(ex){
  aruonet.localfolder.LocalFolderAfficheMsgId2("ErreurCreationDossier", ex);
  return false;
 }

 return false;
}

aruonet.localfolder.ValidRepLocal = function(rep){
 try{
  var bValid = true;
  var item = null;
  var iter = rep.directoryEntries;

  while(iter.hasMoreElements()){
   bValid = false;
   item = iter.getNext();
   item = item.QueryInterface(Components.interfaces.nsIFile);
   if( item.isDirectory() ){
    bValid = aruonet.localfolder.ValidRepLocal(item);
    if( bValid ){ break; }
   }
   else if( item.isFile() ){
    var tab = item.leafName.split(".");
    if( tab.length ){
     if( "msf" == tab[tab.length - 1] ){
      bValid = true;
      break;
     }
    }
   }
  }
  return bValid;
 }
 catch(ex){
  return false;
 }

 return false;
}
