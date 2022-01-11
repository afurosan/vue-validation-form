type inputType = "" | "text" | "password" | "email" | "radio" | "checkbox";

export interface ControlAttribute {
  name?: string;
  type?: inputType;
  label?: string;
  placeholder?: string;
  initialValue?: string;
}

// export class CustomControls {
//   // private _controls: Array<CustomControl>;
//   private _controls: { [key: string]: CustomControl };

//   constructor() {
//     this._controls = {};
//   }

//   push(key: string, ctrl: CustomControl): void {
//     this._controls[key] = ctrl;
//     // this._controls.push(ctrl);
//   }

//   getControl(key: string): CustomControl {
//     return this._controls[key];
//   }
// }

export class CustomControl {
  private _attributes: ControlAttribute;
  private _name: string;
  private _type: inputType;
  private _label: string;
  private _placeholder: string;
  private _initialValue: string;

  constructor(ca: ControlAttribute) {
    this._attributes = {};
    this._name = ca.name || "";
    this._type = ca.type || "";
    this._label = ca.label || "";
    this._placeholder = ca.placeholder || "";
    this._initialValue = ca.initialValue || "";
  }

  get name(): string {
    return this._name;
  }
  set name(v: string) {
    this._name = v;
  }
  get type(): inputType {
    return this._type;
  }
  set type(v: inputType) {
    this._type = v;
  }
  get label(): string {
    return this._label;
  }
  set label(v: string) {
    this._label = v;
  }
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(v: string) {
    this._placeholder = v;
  }
  get initialValue(): string {
    return this._initialValue;
  }
  set initialValue(v: string) {
    this._initialValue = v;
  }

  get attributes(): ControlAttribute {
    this._attributes = {
      name: this._name,
      type: this._type,
      label: this._label,
      placeholder: this._placeholder,
      initialValue: this._initialValue,
    };
    return this._attributes;
  }
}
