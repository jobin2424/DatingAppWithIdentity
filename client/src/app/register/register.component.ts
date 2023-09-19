import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        this.cancel();
      },
      error: (error) => {
        if (error.error.errors.Username)
          this.toastr.error(error.error.errors.Username);
        if (error.error.errors.Password)
          this.toastr.error(error.error.errors.Password);
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
