public without sharing class ProperlyNestedApex {
    /*Using multiple parameter in apex  controller */
    @AuraEnabled
    public static Widget__c createWidget( string Value  ){
        list< Widget__c> wList = new list< Widget__c>();
        Widget__c widgetObj = new Widget__c(); 
        widgetObj.Value__c = Value;
       
        if(Value != null){
            wList.add(widgetObj);
            insert widgetObj;
        }
       
        return widgetObj;


}

@AuraEnabled(cacheable=true)
public static user getUserInfo() {
    String userId = UserInfo.getUserId(); // current user
    return [SELECT ID, FirstName, LastName, Name, Title, Profile.Name,  Email From User WHERE ID =: userId LIMIT 1];
}

}
