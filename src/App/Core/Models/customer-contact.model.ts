export interface CustomerContactsStepsModel {
  steps: CustomerContactStepModel[]
}

export interface CustomerContactStepModel {
  label: 'Personal Info' | 'Address'| 'Completed';
  active: boolean;
  order: number
}

export interface CustomerDetailsFormModel {
  personalInfo: CustomerPersonalInfoModel;
  customerAddress: CustomerAddress
}

export interface CustomerPersonalInfoModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CustomerAddress {
  streetNumber: string;
  streetName: string;
  streetType: streetType;
  suburb: string;
  postcode: string;
}

export type streetType = 'Cl' | 'Ct' | 'St' | 'Pl' | 'Ave' | ''
