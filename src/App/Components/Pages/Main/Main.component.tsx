import React from 'react';
import { connect } from 'react-redux';
import { CustomerDetailsFormStepsState } from '../../../Core/Store/Reducers';
import { StoreModel } from '../../../Core/Store/store.model';
import InteractiveCardComponent from '../../Design-system/Ineractive-Card/Interactive-Card.component';
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
      <div></div>
    )
  }

  private renderTwoStepForm() {
    return (
      <div className="App-main-page__form">
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

