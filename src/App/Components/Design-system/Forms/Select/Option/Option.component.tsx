import React from 'react';
import { OptionProps } from '../../../../../Core/Models';

export const OptionComponent: React.FunctionComponent<OptionProps> =
  (props: OptionProps) => {
    return (
      <option
        key={`${Math.random()}`}
        value={props.value}
      >
        {props.label}
      </option>
    )
  }
