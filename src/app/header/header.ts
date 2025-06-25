import { Component } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
constructor(private router: Router) {}
  //  checkLogin(){
  //   const loginToHome = localStorage.getItem('loginToHome')
  //   if(this.loginToHome.loginToHome==='true'){
  //     return true;
  //   }
  //  }
  checkHome(event:Event){
    if (this.router.url==='/home'){
      this.scrollToSection('main-section');
    }
    else{
      this.router.navigate(['/']);
    }
  }
  

  // Contact scroll (always on same page)
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
