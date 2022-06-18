public without sharing class CpGetAuditFindingList {
    @AuraEnabled(cacheable=true)
    public static list<AuditFinding__c>  getOrgAuditFindings() {
        String userId= userinfo.getUserId();
        user [] ulist = [SELECT Id, AccountId,DefaultAccount__c,ContactId FROM User where ID =:userId ];
        system.debug(ulist);
    
        map<id,Account> accountMap = new map<id,Account>();
    
        for(User u : ulist){
        
            accountMap.put(u.DefaultAccount__c,null);
        }
    map<id,Account> accountMap2 = new map<id,Account>();
    for(Account a : [SELECT Id,Organization__c FROM Account where id =: accountMap.keySet() ]){
            accountMap2.put(a.Organization__c,a);
        
    }
    system.debug('Mapped2==> '+ accountMap2);
    
    map<id,Audit__c> AuditMap1 = new map<id,Audit__c>();
    for(Audit__c adt : [select id,name  from Audit__c where Organization__c in : accountMap2.keySet() ]){
        AuditMap1.put(adt.id,adt);
    }
map<id,AuditFinding__c> AuditFindMap1 = new map<id,AuditFinding__c>();    
 AuditFinding__c [] audFindList = [SELECT Id, Name,AuditFindingTitle__c, AuditTitleLinkLess__c, Finding__c, AuditFindingWorkflowStatus__c, AuditFindingType__c, CapaRequired__c  FROM AuditFinding__c  where Audit__c  in : AuditMap1.keySet()];  
    if(!audFindList.isEmpty()){
        return audFindList;
    }else{
        return null;
    }


    }
}