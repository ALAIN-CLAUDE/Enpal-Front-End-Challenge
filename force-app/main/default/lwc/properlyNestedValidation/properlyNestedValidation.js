import { LightningElement ,track, wire} from 'lwc';

import createWidget from '@salesforce/apex/ProperlyNestedApex.createWidget';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
import getUserInfo from '@salesforce/apex/ProperlyNestedApex.getUserInfo'


export default class ProperlyNestedValidation extends NavigationMixin (LightningElement)  {
    @track Status;
    @track Value;
    @track Name;
    @track widgetRecoreId;
    @track errorMsg;
    @track isButtonDisabled = false; // show button by default
    @track CurrentUserProfile;
 

    ValueHandleChange(event){
        
      
        if(event.target.name == 'WidName'){
            this.Name = event.target.value;  
            }
        if(event.target.name == 'WidValue'){
            this.Value = event.target.value;
        }
 }
 

 @wire(getUserInfo, {}) 
    userData({ error, data }) {
        if(data) {

           // this.AllProfiles = data;
          this.CurrentUserProfile = data ;
          
         
        
        
        } else if(error) {
            // error handling
            console.error(error.body.message);
        }
    }

 

 submitAction(){
     let userInput = this.template.querySelector('.userInput');
     let userInputVal = userInput.value;

     if( userInputVal !=='properly nested'  && (this.CurrentUserProfile.Profile.Name  !== "Widget Masters" || this.CurrentUserProfile.Profile.Name !== "System Administrator" ))
         {
           
            userInput.setCustomValidity('Profile not Allowed. Widget Value Must be properly nested To Submit');
            userInput.reportValidity();
            console.log('userInputVal===> '+ userInputVal);
            console.log('user profile==> '+ this.CurrentUserProfile.Profile.Name );
                   
     }
     else{
         if(this.Value){
        createWidget({Value:this.Value,Name:this.Name})
        .then(result=>{
            
            this.widgetRecoreId = result.Id;
            console.log(result.Value);
            window.console.log('widgetRecoreId ' + this.widgetRecoreId); 
                
                    const toastEvent = new ShowToastEvent({
                        title:'Success!',
                        message:'Record created successfully',
                        variant:'success'
                      });
                      this.dispatchEvent(toastEvent);
                  
          
     
              /*Start Navigation*/
              this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.widgetRecoreId,
                    objectApiName: 'Widget__c',
                    actionName: 'view'
                },
             });
             /*End Navigation*/
     
        })
        .catch(error =>{
           this.errorMsg=error.message;
           window.console.log(this.error);
        });
     
     }else{
         alert('please insert a Widget Value ...!')
     }
    }


 }


}