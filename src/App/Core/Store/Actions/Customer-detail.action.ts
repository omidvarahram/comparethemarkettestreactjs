import {
  CustomerAddress,
  CustomerPersonalInfoModel
} from '../../Models/';

export enum CustomerDetailActionsEnum {
  PERSONAL_INFORMATION_FORM_SUBMIT = '[customer] [personal-information] [submit]',
  ADDRESS_FORM_SUBMIT = '[customer] [address] [submit]'
}

export class CustomerDetailActions {
  public static PersonalInformationFormSubmit(payload: CustomerPersonalInfoModel) {
    return {
      type: CustomerDetailActionsEnum.PERSONAL_INFORMATION_FORM_SUBMIT,
      payload
    }
  }

  public static AddressFormSubmit(payload: CustomerAddress) {
    return {
      type: CustomerDetailActionsEnum.ADDRESS_FORM_SUBMIT,
      payload
    }
  }
}
