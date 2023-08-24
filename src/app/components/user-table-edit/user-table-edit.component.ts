import { Component, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TUser } from 'src/app/models/user.model';

@Component({
  selector: 'user-table-edit',
  templateUrl: './user-table-edit.component.html',
  styleUrls: ['./user-table-edit.component.scss'],
})
export class UserTableEditComponent {
  isChecked = true;
  formUserData = new FormGroup({
    active: new FormControl(false),
  });
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public userData: TUser,
    public dialogRef: MatDialogRef<UserTableEditComponent>
  ) {
    this.isChecked = userData.active;
  }

  onCloseDialog() {
    const active = this.formUserData.value.active;
    this.dialogRef.close({ ...this.userData, active: active });
  }
}
