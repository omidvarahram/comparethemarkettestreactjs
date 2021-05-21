import React from 'react';
import { CustomerDetailsFormStepsState } from '../../../Core/Store/Reducers';
import './Progress.component.scss'

interface ProgressComponentProps {
  steps: CustomerDetailsFormStepsState
}

const steps: {
  order: number;
  label: 'Personal Info' | 'Address' | 'Completed'
}[] = [
  {
    order: 1,
    label: 'Personal Info',
  }, {
    order: 2,
    label: 'Address'
  }, {
    order: 3,
    label: 'Completed'
  }
]

class ProgressComponent extends React.Component<ProgressComponentProps, any> {
  public render(): any {
    return (
      <div className="App-Progress">
        <div className="App-Progress__track"/>
        {
          steps.map(step => {
            return (
              <div
                className={this.determineClassName(step)}
                style={
                  {
                    width: `${100 / steps.length}%`,
                  }
                }
              >
                <div className='App-Progress__step__order'>{step.order}</div>
                <div className='App-Progress__step__label'>{step.label}</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  private determineClassName(step: {
    order: number;
    label: 'Personal Info' | 'Address' | 'Completed'
  }) {
    switch (this.props.steps.currentStep) {
      case 'Personal Info': {
        if (step.order === 1) {
          return 'App-Progress__step active';
        }
        break;
      }

      case 'Address' : {
        if (step.order <=2) {
          return 'App-Progress__step active'
        }
        break;
      }

      case 'Completed': {
        return 'App-Progress__step active'
      }
    }
    return 'App-Progress__step'
  }
}

export default ProgressComponent
