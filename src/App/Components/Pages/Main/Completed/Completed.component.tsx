import React from 'react';
import { CustomerDetailsFormModel } from '../../../../Core/Models';
import './Completed.component.scss'
import { formData } from '../Customer-forms/form-data';

interface CompletedComponentProps {
  customerDetails: CustomerDetailsFormModel
}

const getPersonalInfoData = (customerDetails: CustomerDetailsFormModel): {value: string; label: string}[] => {
  let data = [];
  for (let item of formData.personal_info) {
    data.push(
      {
        label: item.label || '',
        // @ts-ignore
        value: customerDetails.personalInfo[item.controlName] as string || ''
      }
    )
  }
  return data
}

const getAddressData = (customerDetails: CustomerDetailsFormModel) => {
  let data = [];
  for (let item of formData.address) {
    data.push(
      {
        label: item.label || '',
        // @ts-ignore
        value: customerDetails.customerAddress[item.controlName] as string || ''
      }
    )
  }
  return data
}


const renderListItem = (item: any) => {
  return (
    <div className="App-completed__list__item"
      key={`completed_personal-info__${item.label}`}
    >
      <div className="App-completed__list__label">{`${item.label}:`}</div>
      <div className="App-completed__list__value">{item.value || ` - `}</div>
    </div>
  )
}

export const CompletedComponent: React.FunctionComponent<CompletedComponentProps> = (props:CompletedComponentProps) => {
  return (
    <div className="App-completed">
      <div className="App-completed__list">
        <div className="App-completed__list__title">
          Personal Info
        </div>
        {
          getPersonalInfoData(props.customerDetails)?.map(item => renderListItem(item))
        }
      </div>
      <div className="App-completed__list">
        <div className="App-completed__list__title">
          Address
        </div>
        {
          getAddressData(props.customerDetails)?.map((item: any) => renderListItem(item))
        }
      </div>
    </div>
  )
}
