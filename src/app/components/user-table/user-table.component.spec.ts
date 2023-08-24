import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableComponent } from './user-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserTableServiceService } from 'src/app/services/user-table-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUiModuleModule } from 'src/app/modules/material-ui-module/material-ui-module.module';
import { formatCurrency } from 'src/app/helpers/number.helper';
describe('Format currency function', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        MaterialUiModuleModule,
        BrowserAnimationsModule,
      ],
      providers: [UserTableServiceService, MatDialog, MatSnackBar],
    });
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('Should return empty string for a NaN (Not-a-Number) input', () => {
    const input = NaN;
    const expectedNumber = '';
    const formattedCurrency = formatCurrency(input);
    expect(formattedCurrency).toEqual(expectedNumber);
  });

  it('Should return zero for zero input', () => {
    const input = 0;
    const expectedNumber = '$0';
    const formattedCurrency = formatCurrency(input);
    expect(formattedCurrency).toEqual(expectedNumber);
  });

  it('Should have thousand separator and leading by "$" sign', () => {
    const input = 1234;
    const expectedNumber = '$1,234';
    const formattedCurrency = formatCurrency(input);
    expect(formattedCurrency).toEqual(expectedNumber);
  });

  it('Should have thousand separator and leading by "$" sign with large positive number', () => {
    const input = 1234567890;
    const expectedNumber = '$1,234,567,890';
    const formattedCurrency = formatCurrency(input);
    expect(formattedCurrency).toEqual(expectedNumber);
  });

  it('Should have thousand separator and leading by "$" sign with negative number', () => {
    const input = -1234;
    const expectedNumber = '$-1,234';
    const formattedCurrency = formatCurrency(input);
    expect(formattedCurrency).toEqual(expectedNumber);
  });

  it('Should have thousand separator and leading by "$" sign with large negative number', () => {
    const input = -1234567890;
    const expectedNumber = '$-1,234,567,890';
    const formattedCurrency = formatCurrency(input);
    expect(formattedCurrency).toEqual(expectedNumber);
  });
});
