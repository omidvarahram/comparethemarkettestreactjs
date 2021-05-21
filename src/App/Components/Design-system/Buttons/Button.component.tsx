import React from 'react';
import './Button.component.scss'

interface ButtonComponentProps {
  type: 'text' | 'contained'
  color: 'primary' | 'secondary'
  text: string;
  handler: (event: any) => void;
  disable?: boolean;
}

const determineCLassName = (
  type: 'text' | 'contained',
  color: 'primary' | 'secondary'
): string => {
  return `App-button ${type} ${color}`
}

export const ButtonComponent: React.FunctionComponent<ButtonComponentProps> = (props: ButtonComponentProps) => {
  return (
    <button
      className={determineCLassName(props.type, props.color)}
      onClick={(event) => props.handler(event)}
      disabled={props.disable || false}
    >{props.text}</button>
  )
}
