import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  cId:any;
  quizzes:any;
  constructor(private route:ActivatedRoute,private quizservice:QuizService){}
  ngOnInit(): void {
    
    this.route.params.subscribe((params)=>{
      this.cId=this.route.snapshot.params['cId'];
      if(this.cId==0){
        console.log('loading all');
        this.quizservice.getActiveQuiz().subscribe(
          (data:any)=>{
            this.quizzes=data;
            console.log(this.quizzes);
          },
          (error)=>{
            console.log(error);
            
          }
        )
  
        
      }else{
        console.log('load sprcific quiz');
        this.quizservice.getActiveQuizzesOfCategory(this.cId).subscribe(
          (data:any)=>{
            this.quizzes=data;
            console.log(this.quizzes);
            
          },
          (error)=>{
            alert('erroe in loading quiz data');
          }
        )
      }
    })
    
  }

}
