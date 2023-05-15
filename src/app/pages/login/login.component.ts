import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData={
    username:'',
    password:'',
  };
  constructor(private snack:MatSnackBar,private loginservices:LoginService,private router:Router){}
 
  ngOnInit(): void {
      
  }
  formSubmit(){
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.snack.open('user name is required','',{
        duration:3000,
      });
      return;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open('user name is required','',{
        duration:3000,
      });
      return;
    }
    this.loginservices.gennerateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);
        this.loginservices.loginuser(data.token);
        this.loginservices.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginservices.setUser(user);
            console.log(user);
            if(this.loginservices.getUserRole()=='ADMIN'){
              // window.location.href='/admin';
              this.router.navigate(['/admin'])
              this.loginservices.loginStatusSubject.next(true);

            }else if(this.loginservices.getUserRole()=='NORMAL'){
              // window.location.href='/user-dashboard';
              this.router.navigate(['/user-dashboard/0'])
              this.loginservices.loginStatusSubject.next(true);

            }else{
              this.loginservices.logout();
            }
          }
        );
      },
      (error)=>{
        console.log('Error!');
        console.log(error);
        this.snack.open('Invalid Datails!! Try again','',{
          duration:3000,
        })
      }
    )
  }

}
