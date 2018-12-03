import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth'
import { HomePage } from '../home/home';
import {WordpressService} from '../../SERVICE/wordpress.service';
import {PostPage} from '../post/post';

@IonicPage()
@Component({
  selector: 'page-dicas',
  templateUrl: 'dicas.html',
})
export class DicasPage {
  posts: Array<any> = new Array<any>();
  morePageAvailabe:boolean=true;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public fire: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl:LoadingController,
    public wordpressService: WordpressService) {
  
  }
ionViewWillEnter(){
  this.morePageAvailabe = true;
  if(!(this.posts.length >0)){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.wordpressService.getRecentePosts().subscribe(data=>{
      for (let post of data){
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0]+"<p>";
        this.posts.push(post);
      }
      
      loading.dismiss();
    });
  }
}

logout(){
  let toast = this.toastCtrl.create({ duration: 2000, position: 'botom' });

  this.fire.auth.signOut();
  toast.setMessage('Deslogado com sucesso!!!!');
  toast.present();

  this.navCtrl.setRoot(HomePage);
}

postTapped(event,post){
  this.navCtrl.push(PostPage, {item:post});
}
doInfinite(infiniteScroll){
let page =(Math.ceil(this.posts.length/10))+1;
let loading=true;
this.wordpressService.getRecentePosts(page)
.subscribe(data=>{
  for(let post of data){
    if(!loading){
      infiniteScroll.complete();
    }
      this.posts.push(post);
      loading=false;
    
  }
}, err=>{
  this.morePageAvailabe= false;
}
)
}

doRefresh(refresher){
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
  setTimeout(()=>{
    refresher.complete();
  },2000);
}

}
