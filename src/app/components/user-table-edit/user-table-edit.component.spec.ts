import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableEditComponent } from './user-table-edit.component';

describe('UserTableEditComponent', () => {
  let component: UserTableEditComponent;
  let fixture: ComponentFixture<UserTableEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableEditComponent]
    });
    fixture = TestBed.createComponent(UserTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
