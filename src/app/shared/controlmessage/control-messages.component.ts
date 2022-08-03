import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.services';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.scss'],
  animations: [
    trigger('activarError', [
      state(
        'inactive',
        style({
          backgroundColor: 'red',
        })
      ),
      state(
        'active',
        style({
          backgroundColor: 'green',
        })
      ),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out')),
    ]),
  ],
})
export class ControlMessagesComponent implements OnInit {
  public estado: string;
  private _errorMessage: string;
  @Input() control: FormControl;
  @Input() clase?: string;
  constructor() {}
  ngOnInit(): void {
    this.estado = 'inactive';
  }
  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        this.estado = 'active';

        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}
