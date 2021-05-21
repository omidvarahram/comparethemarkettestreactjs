import { CustomerDetailsFormModel } from '../../Models';
import { CustomerDetailActionsEnum, } from '../Actions';
import { Action } from '../Actions/model';

export interface CustomerDetailsFormStepsState {
  currentStep: 'Personal Info' | 'Address' | 'Completed',
  customerDetails: CustomerDetailsFormModel

}

const customerDetailsFormInitialState: CustomerDetailsFormStepsState = {
  currentStep: 'Personal Info',
  customerDetails: {
    personalInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    customerAddress: {
      streetNumber: '',
      streetName: '',
      streetType: 'Cl',
      suburb: '',
      postcode: ''
    }
  }
}

export function customerDetailsFormStepsReducer(
  state: CustomerDetailsFormStepsState = customerDetailsFormInitialState,
  action: Action
): CustomerDetailsFormStepsState {
  switch (action.type) {
    case CustomerDetailActionsEnum.PERSONAL_INFORMATION_FORM_SUBMIT: {
      return {
        currentStep: 'Address',
        customerDetails: {
          personalInfo: action.payload,
          customerAddress: state.customerDetails.customerAddress
        }
      }
    }

    case CustomerDetailActionsEnum.ADDRESS_FORM_SUBMIT: {
      return {
        currentStep: 'Completed',
        customerDetails: {
          customerAddress: action.payload,
          personalInfo: state.customerDetails.personalInfo
        }
      }
    }
    default: {
      return state
    }
  }
}

