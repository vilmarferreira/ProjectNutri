import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth'
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  fotoPerfil: boolean;
  facebook ={
    nome: '',
    email:'',
    fotoUrl: ''
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,public fire: AngularFireAuth,
    public toastCtrl: ToastController) {
  
    this.facebook.nome = fire.auth.currentUser.displayName;
    this.facebook.fotoUrl = fire.auth.currentUser.photoURL;
    this.facebook.email = fire.auth.currentUser.email;

    if(this.facebook.fotoUrl == null){
      this.fotoPerfil=false;
    }else{
      this.fotoPerfil = true;
    }
  }
  logout(){
    let toast = this.toastCtrl.create({ duration: 2000, position: 'botom' });
  
    this.fire.auth.signOut();
    toast.setMessage('Deslogado com sucesso!!!!');
    toast.present();
  
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
