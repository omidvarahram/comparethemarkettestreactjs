import React from 'react';
import './Interactive-Card.component.scss'

interface InteractiveCardComponentProps {
  children: any;
}

interface InteractiveCardComponentState {

}

class InteractiveCardComponent
  extends React.Component<InteractiveCardComponentProps,
    InteractiveCardComponentState> {
  public props: InteractiveCardComponentProps;

  constructor(props: InteractiveCardComponentProps) {
    super(props);
    this.props = props;
  }

  public render() {
    return <div className="App-Interactive-Card">
      {this.props.children}
    </div>
  }
}

export default InteractiveCardComponent;
