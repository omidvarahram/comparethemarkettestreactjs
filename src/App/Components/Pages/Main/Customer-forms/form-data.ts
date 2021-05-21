import { FormDataModel } from '../../../../Core/Models';

export const formData: { [key in "personal_info" | "address"]: FormDataModel[] } = {
  "address": [
    {
      "label": "Street Number",
      "controlName": "streetNumber",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "address",
      "validator": {
        "type": "numeric"
      },
      "required": true
    },
    {
      "label": "Street Name",
      "controlName": "streetName",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "address",
      "validator": {
        "type": "filled"
      },
      "required": true
    },
    {
      "label": "Street Type",
      "controlName": "streetType",
      "formElementType": "select",
      "formElementInputType": "text",
      "formGroupName": "address",
      "defaultValue": "",
      "validator": {
        "type": "enum",
        "enum": [
          "Cl",
          "Ct",
          "St",
          "Pl",
          "Ave",
          ""
        ]
      },
      "required": true,
      "options": [
        {
          "label": "Cl",
          "value": "Cl"
        },
        {
          "label": "Ct",
          "value": "Ct"
        },
        {
          "label": "St",
          "value": "St"
        },
        {
          "label": "Pl",
          "value": "Pl"
        },
        {
          "label": "Ave",
          "value": "Ave"
        },
        {
          "label": "",
          "value": ""
        }
      ]
    },
    {
      "label": "Suburb",
      "controlName": "suburb",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "address",
      "validator": {
        "type": "filled"
      },
      "required": true
    },
    {
      "label": "Postcode",
      "controlName": "postcode",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "address",
      "validator": {
        "type": "range",
        "minRange": [
          0,
          8,
          0,
          0
        ],
        "maxRange": [
          7,
          9,
          9,
          9
        ]
      },
      "required": true
    }
  ],
  "personal_info": [
    {
      "label": "First Name",
      "controlName": "firstName",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "personal-info",
      "validator": {
        "type": "filled"
      },
      "required": true
    },
    {
      "label": "Last Name",
      "controlName": "lastName",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "personal-info",
      "validator": {
        "type": "filled"
      },
      "required": true
    },
    {
      "label": "Email",
      "controlName": "email",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "personal-info",
      "validator": {
        "type": "email"
      },
      "required": true
    },
    {
      "label": "Phone",
      "controlName": "phone",
      "formElementType": "input",
      "formElementInputType": "text",
      "formGroupName": "personal-info",
      "validator": {
        "type": "phone"
      },
      "required": false
    }
  ]
}
