import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  users:any;
  constructor(private userService:UserService) {}

  ngOnInit(){
    this.userService.getUsers().subscribe(response => {
      this.users = response;});
  }


  onSubmit(form: NgForm)
  {
    console.log('Form data:', form.value);
    this.userService.putUser(form.value.name,form.value.email);
  }
}
