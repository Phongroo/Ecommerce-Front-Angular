import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  qId:any;
  quiz:any;
  constructor(private route:ActivatedRoute,private quizservice:QuizService,private router:Router){}
  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qId'];
    this.quizservice.getQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz=data;
        
      },
      (error)=>{
        console.log(error);
        alert("Error in loading quiz");
        
      }
    )
    
  }
  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon:'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this.router.navigate(['/start/'+this.qId]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
