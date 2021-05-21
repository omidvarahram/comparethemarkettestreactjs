import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

const envSetup = (): void => {
  // to deactivate console.log() in production
  if (process.env.NODE_ENV !== 'development') {
    console.log = (msg: any) => {
      return console.debug(msg);
    };
    console.error = (msg: any) => {
      return console.debug(msg);
    };
    console.table = (msg: any) => {
      return console.debug(msg);
    };
    console.clear();
  } else {
    console.clear();
  }
};

class App extends React.Component<any, any> {
  componentDidMount(): void {
    envSetup();
  }

  public render() {
    return (
      <div>
        App
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
