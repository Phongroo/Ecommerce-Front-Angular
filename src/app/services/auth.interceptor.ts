import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER='Authorization';
@Injectable()
export class AutInterceptor implements HttpInterceptor{

    constructor(private loginservice:LoginService){}

    intercept(req:HttpRequest<any>,
        next:HttpHandler
        ):Observable<HttpEvent<any>>{
        let authReq=req;
       const token=this.loginservice.getToken();
       console.log('inside interceptor');
       if(token!=null){
        authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`},
    });
       }
       return next.handle(authReq);
    }
    
    
}
export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AutInterceptor,
        multi:true,

    },
];