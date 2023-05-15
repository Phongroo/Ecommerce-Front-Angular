import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  qId:any;
  title:any;
  questions:any;
  constructor(private routte:ActivatedRoute,private questionservice:QuestionService,private snack:MatSnackBar){}
  ngOnInit(): void {
    this.qId=this.routte.snapshot.params['qId'];
    this.title=this.routte.snapshot.params['title'];
    this.questionservice.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure'
    }).then((result)=>{
      if(result.isConfirmed){
        this.questionservice.deleteQuestion(quesId).subscribe(
          (data)=>{
            this.snack.open('Question deleted','',{
              duration:3000
            });
            this.questions=this.questions.filter((q:any)=>q.quesId==quesId)
          },(error)=>{
            this.snack.open('Error in deleted question','',{
              duration:3000
            });
            console.log(error);
          }
        )
      }
    });
  }
}
