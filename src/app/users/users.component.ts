import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Users } from './user.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<any[]>;
  _users: Array<Users>;
  showFormDiv: boolean = false;
  recordForm: FormGroup;
  record: string = '';
  userId: string = '';

  constructor(private userService: UserService, private fb: FormBuilder, private messageService: MessageService) { 
    this.users$ = this.userService.usersAction.getUsers();

    this.users$.subscribe(res => {
      this._users = res;
    });
  }

  ngOnInit(): void {
    this.buildFormControls();
  }

  buildFormControls() {
    this.recordForm = this.fb.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dob: new FormControl(''),
      qualification: new FormControl()
    })
  }

  addUser(user: Users) {
    this.userService.usersAction.addUser(user)
      .subscribe(res => {
        if(!!res && res.data) {
          this._users.push({...res.data, ...this._users});
          this.messageService.add({severity: 'success', summary: 'Message', detail: res.msg });
          this.recordForm.reset();
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Message', detail: error.error.msg })
      }
    )
  }

  _updateUser(id: string, user: Users) {
    this.userService.usersAction.updateUser(this.userId, user)
      .subscribe(res => {
        if(!!res && res.status) {
          this._users = res.data;
          this.messageService.add({severity: 'success', summary: 'Message', detail: res.msg });
          this.recordForm.reset();
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Message', detail: error.error.msg });
      }
    ) 
  }

  updateUser (user: Users) {
    this.showFormDiv = true;
    this.recordForm.get('firstName').setValue(user.firstName)
    this.recordForm.get('lastName').setValue(user.lastName)
    this.recordForm.get('dob').setValue(user.dob)
    this.recordForm.get('qualification').setValue(user.qualification)
    this.userId = user.id
  }

  deleteUser(user) {
    this.userService.usersAction.deleteUser(user.id)
      .subscribe(res => {
        if(!!res && res.success) {
          this._users = res.users;
          this.messageService.add({severity: 'success', summary: 'Message', detail: res.msg });
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Message', detail: error.error.msg });
      }
    )

  }

  submit(user: Users) {
    this.record === 'add' ? this.addUser(user) : this._updateUser(this.userId, user);
  }

  addRecord(e) {
    this.showFormDiv = e;
    this.record = 'add'
  }

}
