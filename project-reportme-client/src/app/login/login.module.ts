import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule,
        FormsModule, ReactiveFormsModule, NgbModule.forRoot(), LoginRoutingModule],
    declarations: [LoginComponent]
})
export class LoginModule { }
