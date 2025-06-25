import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Contact } from '../contact/contact';
@Component({
  selector: 'app-home',
  imports: [Header,Contact],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home  {

}
