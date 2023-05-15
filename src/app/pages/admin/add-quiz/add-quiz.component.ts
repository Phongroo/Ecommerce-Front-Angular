import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories:any;
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cId:'',     
    },
  }
    
  constructor(private categoryservice:CategoryService,private quizservice:QuizService,private snack:MatSnackBar){}
  ngOnInit(): void {
   this.categoryservice.categories().subscribe(
    (data:any)=>{
      this.categories=data;
      console.log(this.categories);
      
    },(error)=>{
      console.log(error);
      Swal.fire('Errror !!','error in loading data from server','error');
    }
   );
  }
  addQuiz(){
    if(this.quizData.title.trim()==''||this.quizData.title==null){
      this.snack.open('Title Required !!','',{
        duration:3000,
      });
      return;
    }
    this.quizservice.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','quiz is added','success');
        this.  quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cId:'',     
          },
        };
      },
      (error)=>{
        Swal.fire('Error!!','Error while adding quiz','error');
        console.log(error);
      }
    )
  }
  

}
