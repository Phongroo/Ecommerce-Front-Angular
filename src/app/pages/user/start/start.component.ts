import { LocationStrategy } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  qId:any;
  question:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  constructor(private locationStr:LocationStrategy,private route:ActivatedRoute,private questionservice:QuestionService){}
  ngOnInit(): void {
   this.preventBackButton();
   this.qId= this.route.snapshot.params['qId'];
   console.log(this.qId);
   this.loadQuestion();
   
  }

  loadQuestion(){
    this.questionservice.getQuestionOfQuizForTest(this.qId).subscribe(
      (data:any)=>{        
        this.question=data;
        this.timer=this.question.length*2*60;        
        console.log(this.question);
        this.startTimer();
        
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error!!','Error in loading questions of quiz','error');
        
      }
    )
  }


  preventBackButton(){
    history.pushState(null, "" ,location.href);
    this.locationStr.onPopState(()=>{
      history.pushState(null,"",location.href);
    })
  }
  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      
      showCancelButton: true,
      confirmButtonText: 'Submit',
      denyButtonText: `Don't save`,
      icon:'info',
    }).then((e:any)=>{
      if(e.isConfirmed){
       this.evalQuiz();
        
      }
    })
  }
  startTimer(){
  let t = window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }
  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }
  evalQuiz(){
    this.questionservice.evalQuiz(this.question).subscribe(
      (data:any)=>{
        console.log(data);
        this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswer;
        this.attempted=data.attempted;
        this.isSubmit=true;
      },
      (error)=>{
        console.log(error);
        
      }
    )
    // this.isSubmit=true;
    // this.question.forEach((q:any)=>{
    //   if(q.giveAnswer==q.answer){
    //     this.correctAnswers++;
    //    let markSingle = this.question[0].quiz.maxMarks/this.question.length;
    //    this.marksGot+=markSingle;
    //   }  
    //   if(q.giveAnswer.trim()!=''){
    //     this.attempted++;
    //   }
               
    // });
    // console.log("Correct Answer"+ this.correctAnswers);
    // console.log("Marks Got", this.marksGot);
    // console.log("Attempted",this.attempted);
  }
  printPage(){
    window.print();
  }

}
