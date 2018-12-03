import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 @ViewChild("email") email;
 @ViewChild("password") password;
 tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fire: AngularFireAuth,public toastCtrl: ToastController) {
    this.tabBarElement= document.querySelector('.show-tabbar');

  }
  ionViewWillEnter(){
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

  registrar(){
  let toast = this.toastCtrl.create({ duration: 2000, position: 'botom' });

  this.fire.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
  
  .then(data =>{
  		//vai chamar proximapagina logado!
  		console.log(data);
  		toast.setMessage("Usuario criado com sucesso!!");
  		toast.present();
  		this.navCtrl.setRoot(TabsPage)
  })
  .catch((error : any)=>{
  if(error.code == 'auth/invalid-email'){
  		toast.setMessage("Email invalido!!");
  		toast.present();
  }else if (error.code == 'auth/email-already-in-use'){
  		toast.setMessage("Email digitado já está em uso!!");
  		toast.present();
  }else if (error.code == 'auth/operation-not-allowed'){
  		toast.setMessage("Email não está habilitado para cadastro!!");
  		toast.present();
  }else if (error.code == 'auth/weak-password'){
  		toast.setMessage("Eiii essa senha é muito fraca!!");
  		toast.present();
  }

  })
  }

}
