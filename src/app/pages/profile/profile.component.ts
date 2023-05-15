import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
 public user:any;
  constructor(private loginservice:LoginService){}
  ngOnInit(): void {
    this.user=this.loginservice.getUser();
    
  }

}
