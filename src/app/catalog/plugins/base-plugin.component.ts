import { OnInit, OnDestroy, Input, Host } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    FormGroupDirective
} from '@angular/forms';

import { Cloud } from '../../shared/models/cloud';

// Provides automatic initialisation of form values based on an initial Config
// dictionary. Inheriting classes must implement the methods configName
// and initialConfig. This class will walk through the initialConfig object,
// setting form values as appropriate.
export abstract class BasePluginComponent implements OnInit, OnDestroy {
    _cloud: Cloud;
    private _initialConfig: any;

    get form(): FormGroup {
        throw new TypeError("get form must be implemented");
    }

    get configName(): string {
        throw new TypeError("get configName must be implemented");
    }

    get initialConfig() {
        return this._initialConfig;
    }

    set initialConfig(value) {
        this._initialConfig = value;
        if (value && value[this.configName]) {
            // Recursively set initial values on controls
            this.form.patchValue(value[this.configName]);
        }
    }

    get cloud() {
        return this._cloud;
    }

    set cloud(value) {
        this._cloud = value;
    }

    constructor(fb: FormBuilder, private parentContainer: FormGroupDirective) {
    }

    ngOnInit() {
        // Add child form to parent so that validations roll up
        if (this.parentContainer != null) {
            this.parentContainer.form.addControl(this.configName, this.form);
        }
    }

    ngOnDestroy() {
        if (this.parentContainer != null) {
            this.parentContainer.form.removeControl(this.configName);
        }
    }
}
