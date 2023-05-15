import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn=false;
  username=null;

  constructor(public loginservice:LoginService,private router:Router){}


  ngOnInit():void{
    this.isLoggedIn=this.loginservice.isLoggedIn();
    this.username=this.loginservice.getUser();
    this.loginservice.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn=this.loginservice.isLoggedIn();
     this.username=this.loginservice.getUser();
    });
  }

  logout(){
    this.loginservice.logout(); 
    window.location.reload();
    // this.router.navigate(['/login']);
   
  }

}
