import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  category={
    title:'',
    description:'',

  };
  constructor(private categoryservice:CategoryService,private snack:MatSnackBar){}
  ngOnInit(): void {
   
  }

  formSubmit(){
    if(this.category.title.trim()==''||this.category.title==null){
      this.snack.open('Title require !!','',{
        duration:3000,
      });
      return;
    }
    this.categoryservice.addCategory(this.category).subscribe((data:any)=>{
      this.category.title='';
      this.category.description='';
      Swal.fire('Success!!','Category is successfully','success');
    },(error)=>{
      console.log(error);
      Swal.fire('Error !!','Server error','error');

    })
  }

}
