import { MatPaginator } from '@angular/material/paginator';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TUser, TUserResponse } from 'src/app/models/user.model';
import { UserTableServiceService } from 'src/app/services/user-table-service.service';
import { tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { UserTableEditComponent } from '../user-table-edit/user-table-edit.component';
import { formatCurrency } from 'src/app/helpers/number.helper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})

export class UserTableComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  displayedColumns: string[] = ['Name', 'Balance', 'Email', 'Registration', 'Status', 'ACTION']
  dataSource: any
  pageSize = 10;
  currentPage = 0;
  totalSize = 0;
  pageSizeOptions = [10, 20, 50]

  constructor(private userTableServiceService: UserTableServiceService, private dialog: MatDialog, private ref: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUsers();
  }

  openDialog(user: TUser) {
    const dialogRef = this.dialog.open(UserTableEditComponent, {
      width: '450px',
      data: user,
    });

    //Update user
    dialogRef.afterClosed().subscribe((result: TUser) => {
      if (result) {
        this.dataSource.data.forEach((obj: TUser) => {
          if (result.id === obj.id) {
            obj.active = result.active
          }
        })
        this.snackBar.open(`Updated user`, '', {
          duration: 2000
        })
        this.setLocalStorage('data', this.dataSource.data)
      }
    })
  }

  //Get data from server
  getAllUsers() {
    this.userTableServiceService.getAllUsers().pipe(tap((res: TUser[]) => {
      if (res) {
        const tmpData = res.map(obj => ({ ...obj, balance: formatCurrency(obj.balance), checked: false })) //add new field checked
        this.dataSource = new MatTableDataSource(tmpData)
        this.totalSize = res?.length
        this.dataSource.paginator = this.paginator;
        this.setLocalStorage('data', tmpData)
      }
    }
    )).subscribe()
  }


  // Get data from local storage
  getAllUsersCache() {
    const users = this.getLocalStorage('data');
    this.dataSource = new MatTableDataSource(users);
    this.ref.detectChanges(); // Detect element ref change
    this.totalSize = users.length;
    this.dataSource.paginator = this.paginator;
  }

  // Check if get data from cache or server
  getUsers() {
    return this.getLocalStorage('data') ? this.getAllUsersCache() : this.getAllUsers()
  }

  // Counting checked items
  countCheckedItems(): number {
    return this.dataSource?.data.filter((obj: TUserResponse) => obj.checked).length
  }


  handelCheckAll(e: any) {
    this.dataSource.data = this.dataSource.data.map((obj: TUser) => ({ ...obj, checked: e.checked }))
    this.countCheckedItems()
  }

  handleCheckbox(e: any, name: string) {
    this.dataSource.data = this.dataSource.data.map((obj: TUser) => obj.name === name ? { ...obj, checked: e.checked } : obj)
    this.countCheckedItems()
  }

  deleteUserTable(name: string, id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.dataSource.data = this.dataSource.data.filter((obj: TUser) => obj.id !== id)
        this.countCheckedItems()
        this.setLocalStorage('data', this.dataSource.data)
        this.snackBar.open(`Deleted user with the name ${name}`, '', {
          duration: 2000,
        });
      }
    });

  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!)
  }

}
