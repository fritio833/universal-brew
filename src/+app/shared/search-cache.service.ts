import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService  } from './cache.service';

// domain/feature service
@Injectable()
export class SearchCacheService {
   // This is only one example of one Model depending on your domain
  constructor(public _cache: CacheService) {

  }

 /**
  * whatever domain/feature method name
  */
  get(url) {
    // you want to return the cache if there is a response in it.
    // This would cache the first response so if your API isn't idempotent
    // you probably want to remove the item from the cache after you use it. LRU of 10
    // you can use also hashCodeString here
    let key = url;

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    } else
      return null;

  }

  setLastSearch(name) {
      let json = {
          name:name
      }
      console.log('set',json);
    this._cache.set('__last_search',json);
  }

  getLastSearch() {
    if (this._cache.has('__last_search')) {
      let page = this._cache.get('__last_search'); 
      return page.name;
    } else
      return null;
  }

  setBeer(name) {
    let json = {
        q:name
    }
    this.setLastSearch('beer');
    this._cache.set('__beer_cache',json);
  }

  getBeer() {
    if (this._cache.has('__beer_cache'))
        return this._cache.get('__beer_cache');
    else
        return null;
  }

  setBrewery(name,options?,geo?) {
    let json = {
        q:name,
        opt:options,
        geo:geo
    }
    this.setLastSearch('brewery');
    this._cache.set('__brewery_cache',json);
  }

  getBrewery() {
    if (this._cache.has('__brewery_cache'))
        return this._cache.get('__brewery_cache');
    else
        return null;
  }

  setBar(name,options,geo) {
    let json = {
        q:name,
        opt:options,
        geo:geo
    }
    this.setLastSearch('bar');
    this._cache.set('__bar_cache',json);
  }

  getBar() {
    if (this._cache.has('__bar_cache'))
        return this._cache.get('__bar_cache');
    else
        return null;
  }   


}
