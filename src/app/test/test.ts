import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.css'
})
export class Test {
constructor(){
  effect(()=>{
    // console.log(this.a())
    console.log(this.number)
  })
}

  x=20;
  y=20;
a=signal(10);
b=signal(20);
c = computed(()=>this.a()+this.b())
z=this.x+this.y;

show(){
  console.log(this.c());
  this.a.set(20);
console.log(this.z)
this.x=30;
  console.log(this.c());
  console.log(this.z)
}

number =10;
increament(){
  this.number+=1;
  this.a.update(a => a+1);
}
}
