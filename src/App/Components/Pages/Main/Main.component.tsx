import React from 'react';
import { connect } from 'react-redux';
import { CustomerDetailsFormStepsState } from '../../../Core/Store/Reducers';
import { StoreModel } from '../../../Core/Store/store.model';
import InteractiveCardComponent from '../../Design-system/Ineractive-Card/Interactive-Card.component';
import ProgressComponent from '../../Shared/Progress/Progress.component';
import { CompletedComponent } from './Completed/Completed.component';
import { AddressComponent } from './Customer-forms/Address/Address.component';
import { PersonalInformationComponent } from './Customer-forms/Personal-information/Personal-information.component';
import './Main.component.scss'

interface MainPageProps {
  children?: any;
  customerDetailsFormStepsState: CustomerDetailsFormStepsState
}

enum steps {
  personal_info = 'Personal Info',
  address = 'Address',
  completed = 'Completed'
}

class MainPage extends React.Component<MainPageProps, any> {

  public render() {
    return <div className='App-main-page'>
      <InteractiveCardComponent>
        <h2>Customer contact details form</h2>
        {this.renderFormProgress()}
        {this.renderTwoStepForm()}
      </InteractiveCardComponent>
    </div>
  }

  private renderFormProgress(): any {
    return (
      <ProgressComponent
        steps={this.props.customerDetailsFormStepsState}
      />
    )
  }

  private renderTwoStepForm() {
    return (
      <div className="App-main-page__form">
        {
          this.props.customerDetailsFormStepsState.currentStep === steps.personal_info ?
            <PersonalInformationComponent/>
            : this.props.customerDetailsFormStepsState.currentStep === steps.address ?
            <AddressComponent/> : <CompletedComponent
              customerDetails={this.props.customerDetailsFormStepsState.customerDetails}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = (state: StoreModel) => {
  return {
    customerDetailsFormStepsState: state.customerDetailsFormStepsState
  }
}

export default connect(mapStateToProps)(MainPage)

