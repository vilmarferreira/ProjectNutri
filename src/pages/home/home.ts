import { Component, ViewChild } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {RegisterPage} from '../register/register';
import {RecuperarPage} from '../recuperar/recuperar'
import { AngularFireAuth} from 'angularfire2/auth';
import { Users } from '../home/users';
import firebase from 'firebase'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users : Users = new Users();
  @ViewChild("usuario") email;
  @ViewChild("password") password;
  tabBarElement: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public fire: AngularFireAuth) {
    this.tabBarElement= document.querySelector('.show-tabbar');
  }
  ngAfterViewinit(){
    let tabs= document.querySelectorAll('.show-tabbar');
    if(tabs!==null){
      Object.keys(tabs).map((key)=>{
        tabs[key].style.display= 'none';
      })
    }
  }
  ionViewWillLeave(){
    let tabs= document.querySelectorAll('.show-tabbar');
    if(tabs!==null){
      Object.keys(tabs).map((key)=>{
        tabs[key].style.display= 'none';
      })
    }
  }
  
  entrar(){

   let toast = this.toastCtrl.create({ duration: 2000, position: 'botom' });
   this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
  .then(data=>{
    this.users.email = this.email.value;
    this.users.senha = this.password.value;
    this.navCtrl.setRoot(TabsPage);
    //case de certo vem pra ca
  })
  .catch((error:any)=>{
    if(error.code == 'auth/invalid-email'){
  		toast.setMessage("Email invalido!!");
  		
  }else if (error.code == 'auth/user-disabled'){
  		toast.setMessage("Usuario desabilitado");
  		
  }else if (error.code == 'auth/user-not-found'){
  		toast.setMessage("Usuario não encontrado");
  		
  }else if (error.code == 'auth/wrong-password  '){
  		toast.setMessage("Eiii essa senha é invalida!!");
  		
  }
    toast.present();
    //vai as exceções de erros
  })
  }

  cadastrar()
  {
    this.navCtrl.push(RegisterPage);
  }
  recuperar()
  {
    this.navCtrl.push(RecuperarPage)
  }

  //logando com o facebook
  loginWithFacebook()
  {
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res=>{
      this.navCtrl.setRoot(TabsPage);

    })
  }
}
