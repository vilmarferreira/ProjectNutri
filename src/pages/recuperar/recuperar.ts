import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-recuperar',
  templateUrl: 'recuperar.html',
})
export class RecuperarPage {

  @ViewChild('email') emailDigitado;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController,
    public fire: AngularFireAuth) { }

 recuperar(){
   let toast = this.toastCtrl.create({duration:2000, position: 'botom'});
   
   this.fire.auth.sendPasswordResetEmail(this.emailDigitado.value)
  .then(()=>{
    toast.setMessage('Solicitação enviada para seu email');
    toast.present();
    this.navCtrl.pop();// voltar para tela anterior
  })
  .catch((error:any)=>{
    if(error.code == 'auth/invalid-email'){
      toast.setMessage('Email invalido...');
    }else if(error.code == 'auth/user-note-found'){
      toast.setMessage('Usuario não encontrado!!');
    }
    toast.present();
  })
 }

}
