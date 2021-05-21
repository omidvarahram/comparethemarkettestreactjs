import React from 'react';
import {
  Subject
} from 'rxjs';

export class AbstractComponent<P,S> extends React.Component<P, S> {
  public destroy$: Subject<Boolean> = new Subject<Boolean>();

  public componentDidMount() {
    this.destroy$.next(true);
  }

  public componentWillUnmount() {
    this.destroy$.next(false);
    this.destroy$.complete()
  }
}
