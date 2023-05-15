import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
  public addQuiz(quiz:any){
   return this.http.post(`${baseUrl}/quiz/`,quiz);
  }
  public deleteQuiz(qId:any){
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
  }
  public getQuiz(qId:any){
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }
  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }
  public getQuizOfCategory(cId:any){
    return this.http.get(`${baseUrl}/quiz/category/${cId}`)
  }
  public getActiveQuiz(){
    return this.http.get(`${baseUrl}/quiz/active`);
  }
  public getActiveQuizzesOfCategory(cId:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}
