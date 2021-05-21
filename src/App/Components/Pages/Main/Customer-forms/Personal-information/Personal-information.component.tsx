import React, { ChangeEvent } from 'react';
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
import './Personal-information.component.scss'

const formData: FormDataModel[] = require('../form-data.json')?.personal_info || []

interface PersonalInformationComponentProps {
  children?: any
}

interface PersonalInformationComponentState {
  formGroup: {
    controlName: string;
    value: any;
    valid: boolean;
    error: string;
  }[]
}

export class PersonalInformationComponent extends AbstractComponent<PersonalInformationComponentProps,
  PersonalInformationComponentState> {

  public state: PersonalInformationComponentState = PersonalInformationComponent.initState();

  private FormGroupListener: BehaviorSubject<UserInteractionHandler | undefined>
    = new BehaviorSubject<any>(undefined);

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
            formData
          );
        }
      })
  }

  public render(): any {
    return (
      <div className="App-personal-info">
        <FormComponent baseClassname='App-personal-info__form'>
          {formData.map(item => {
            return (
              <>
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
                />
                <ValidationMessageComponent
                  valid={this.getControlValidation(item.controlName).valid}
                  error={this.getControlValidation(item.controlName).error}
                />
              </>
            )
          })}
        </FormComponent>
        <div className="App-personal-info__buttons">
          <ButtonComponent
            text='Reset'
            type='contained'
            color='primary'
            handler={(event) => this.reset()}
          />
          <ButtonComponent
            text='Next'
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

    this.setState({ formGroup })
  }

  private reset(): void {
    this.setState(PersonalInformationComponent.initState());
    document.querySelector('form')?.reset()
  }

  private submit(): void {
    const state = this.state.formGroup
    if (this.getFormValidation()) {
      Store.dispatch(CustomerDetailActions.PersonalInformationFormSubmit({
        firstName: state.find(i => i.controlName === 'firstName')?.value || '',
        lastName: state.find(i => i.controlName === 'lastName')?.value || '',
        phone: state.find(i => i.controlName === 'phone')?.value || '',
        email: state.find(i => i.controlName === 'email')?.value || '',
      }))
    }

  }

  private static initState(): PersonalInformationComponentState {
    return {
      formGroup: [
        {
          controlName: 'firstName',
          value: '',
          valid: false,
          error: ''
        },
        {
          controlName: 'lastName',
          value: '',
          valid: false,
          error: ''
        },
        {
          controlName: 'email',
          value: '',
          valid: false,
          error: ''
        },
        {
          controlName: 'phone',
          value: '',
          valid: true,
          error: ''
        },
      ]
    }
  }
}
