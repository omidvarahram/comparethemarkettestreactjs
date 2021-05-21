import React, {
  ChangeEvent,
  Fragment
} from 'react';
import { BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractComponent } from '../../../../../Core/Abstracts/AbstractComponent';
import {
  FormDataModel,
  UserInteractionHandler
} from '../../../../../Core/Models';
import { validateForm } from '../../../../../Core/Services/Validator.service';
import { CustomerDetailActions } from '../../../../../Core/Store/Actions';
import { Store } from '../../../../../Core/Store/Store';
import {
  ButtonComponent,
  FormComponent,
  FormItemComponent,
  ValidationMessageComponent
} from '../../../../Design-system';
import { formData } from '../form-data';
import './Address.component.scss'

const formAddressData: FormDataModel[] = formData.address;

interface AddressComponentProps {
  children?: any
}

interface AddressComponentState {
  formGroup: {
    controlName: string;
    value: any;
    valid: boolean;
    error: string;
  }[]
}

export class AddressComponent extends AbstractComponent<AddressComponentProps, AddressComponentState> {
  public state: AddressComponentState = AddressComponent.initState();

  private FormGroupListener: BehaviorSubject<UserInteractionHandler | undefined>
    = new BehaviorSubject<any>(undefined)

  public componentDidMount() {
    this.FormGroupListener.pipe(
      takeUntil(this.destroy$),
    )
      .subscribe(item => {
        if (item?.event && item?.controlName) {
          this.handleFormChanges(item.event, item.controlName);
          validateForm(
            item.event,
            item.controlName,
            this.state, (newState) => {
              this.setState(newState)
            },
            formAddressData
          );
        }
      })
  }

  public render() {
    return (
      <div className='App-address'>
        <FormComponent baseClassname='App-address__form'>
          {formAddressData.map(item => {
            return (
              <Fragment
                key={`FormItem___${item.formGroupName}___${item.controlName}`}
              >
                <FormItemComponent
                  label={`${item.label}`}
                  formGroupName={item.formGroupName}
                  controlName={item.controlName}
                  formItemType={item.formElementType}
                  type={item.formElementInputType}
                  placeHolder={item.placeholder}
                  required={item.required}
                  validatorType={item.validator}
                  handler={this.FormGroupListener}
                  options={item.options?.length ? item.options : []}
                  valid={this.getControlValidation(item.controlName).valid}
                  error={this.getControlValidation(item.controlName).error}
                />

                <ValidationMessageComponent
                  valid={this.getControlValidation(item.controlName).valid}
                  error={this.getControlValidation(item.controlName).error}
                />
              </Fragment>
            )
          })}
        </FormComponent>
        <div className="App-address__buttons">
          <ButtonComponent
            text='Reset'
            type='contained'
            color='primary'
            handler={(event) => this.reset()}
          />
          <ButtonComponent
            text='Continue'
            type='contained'
            color='primary'
            handler={() => this.submit()}
            disable={!this.getFormValidation()}
          />
        </div>
      </div>
    )
  }

  private getFormValidation(): boolean {
    for (let validation of this.state.formGroup) {
      if (!validation.valid) {
        return false
      }
    }

    return true;
  }

  private getControlValidation(controlName: string): { valid: boolean, error: string } {
    let control = this.state.formGroup.find(item => item.controlName === controlName);

    let valid = false;
    let error = ''

    if (!!control?.controlName) {
      valid = control.valid;
      error = control.error
    }

    return { valid, error };
  }

  private handleFormChanges(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, controlName: string): void {
    const formGroup = this.state.formGroup;
    for (let item of formGroup) {
      if (item.controlName === controlName) {
        item.value = event?.target?.value || ''
      }
    }

    this.setState({ formGroup });
  }

  private reset(): void {
    this.setState(AddressComponent.initState());
    document.querySelector('form')?.reset()
  }

  private submit(): void {
    const state = this.state.formGroup
    if (this.getFormValidation()) {
      Store.dispatch(CustomerDetailActions.AddressFormSubmit({
        streetNumber: state.find(i => i.controlName === 'streetNumber')?.value || '',
        streetName: state.find(i => i.controlName === 'streetName')?.value || '',
        streetType: state.find(i => i.controlName === 'streetType')?.value || '',
        suburb: state.find(i => i.controlName === 'suburb')?.value || '',
        postcode: state.find(i => i.controlName === 'postcode')?.value || '',
      }))
    }
  }

  private static initState(): AddressComponentState {
    return {
      formGroup: [
        {
          controlName: 'streetNumber',
          value: '',
          valid: false,
          error: ''
        },
        {
          controlName: 'streetName',
          value: '',
          valid: false,
          error: ''
        },
        {
          controlName: 'streetType',
          value: '',
          valid: false,
          error: ''
        },
        {
          controlName: 'suburb',
          value: '',
          valid: false,
          error: ''
        },
        {
          controlName: 'postcode',
          value: '',
          valid: false,
          error: ''
        },
      ]
    }
  }
}
