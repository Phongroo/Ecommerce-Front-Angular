import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  constructor(private route:ActivatedRoute,private quizservice:QuizService,private categoryservice:CategoryService,
    private router:Router){}
  qId=0;
  quizData:any;
  categories:any;
  ngOnInit(): void {
   this.qId=this.route.snapshot.params['qId'];
   this.quizservice.getQuiz(this.qId).subscribe(
    (data:any)=>{
      this.quizData=data;
      console.log(this.quizData);
      
    },
    (error)=>{
      console.log(error);      
      
    }
   );
   this.categoryservice.categories().subscribe(
    (data:any)=>{
      this.categories=data;
    },
    (error)=>{
      alert('error loading categories');
    }
   );
  }

  updateData(){
    this.quizservice.updateQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Succsess','quiz update','success');
        this.router.navigate(['/admin/quizzes']);
      },
      (error)=>{
        Swal.fire('Error','error in updating quiz','error');
        console.log(error);
        
      }
    )
  }

}
