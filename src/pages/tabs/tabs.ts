import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {DicasPage} from  '../dicas/dicas';
import {PerfilPage} from '../perfil/perfil'

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  DicasPage= DicasPage;
  PerfilPage = PerfilPage;
  
}
