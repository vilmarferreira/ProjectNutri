import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import * as Config from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WordpressService{
    constructor(public http: Http){

    }

    getRecentePosts(page: number=1){
        return this.http.get(Config.WORDPRESS_REST_API_URL+'?page='+page)
        .map(res => res.json());
    }
    getAuthor(author){
        return this.http.get(Config.WORDPRESS_REST_API_URL+ 'users/'+author)
        .map(res => res.json());
    }
    getPostCategorias(post){
        let ObservableBatch= [];
        post.categories.forEach(category=>{
            ObservableBatch.push(this.getCategory(category));
        })
        return Observable.forkJoin(ObservableBatch);
    }
    getCategory(category){
        return this.http.get(Config.WORDPRESS_REST_API_URL+ 'categories/'+category)
        .map(res => res.json());
    }
}