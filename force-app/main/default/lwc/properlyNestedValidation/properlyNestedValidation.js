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
        var userInput = this.template.querySelector('.userInput');
        var userInputVal = userInput.value;
        //var profill = this.CurrentUserProfile.Profile.Name ;

        let profill =  this.CurrentUserProfile.Profile.Name;

          if (!((profill == "System Administrator" ) || (profill == "Widget Masters"))) {
              if(userInputVal !== "properly nested"){

                console.log('profile is ==> '+ profill);
                console.log('profile is not admin or widget');
                userInput.setCustomValidity('Profile not Allowed. Widget Value Must be properly nested To Submit');
                userInput.reportValidity();

              }
            
          } else {
            console.log('profile is ==> '+profill);
            console.log('profile is admin or widget ');
             if(this.Value){
                 createWidget({Value:this.Value})
                 .then(result=>{
                     this.widgetRecoreId = result.Id;
                     console.log(result.Value);
                     window.console.log('widgetRecoreId ' + this.widgetRecoreId);const toastEvent = new ShowToastEvent({
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
                         actionName: 'view' },
             });
             /*End Navigation*/
     
            })
            .catch(error =>{
               this.errorMsg=error.message;
               window.console.log(this.error);
            });
    
             }else{   
                 alert('Please insert a Widget Value ...!')

             }

          }
       
    }
   


}