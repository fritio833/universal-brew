import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ModelService } from '../shared/model/model.service';
import { Meta } from '../../angular2-meta';
import { CommonService } from '../shared/common.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'contact',
  styleUrls: [ './contact.component.css' ],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  data: any = {
    contactEmail:'',
    contactName:'',
    contactMessage:''  
  };

  formSubmitted:boolean = false;
  notifyEmailStatus:string = null;
  showLoader:boolean = false;

  constructor(public model: ModelService, public meta:Meta, public http:Http, public common:CommonService) {
    this.getMeta();
  }

  sendEmail() {
      this.showLoader = true;
      this.notifyEmailStatus = null;
      const headers = new Headers({
          'Content-Type' : 'application/json'
      });

      this.http.post("https://formspree.io/frito833@gmail.com", 
          {
              name: this.data.contactName,
              _replyto: this.data.contactEmail,
              message: this.data.contactMessage
          },
          {
              'headers' : headers
          }
      ).subscribe(resp=>{
        console.log('resp',resp);
        if (resp.ok) {
            this.formSubmitted = true;
            this.notifyEmailStatus = null;
        } else {
          this.notifyEmailStatus = "Problems sending email.  Please try again.";
        }
        this.showLoader = false;
      },error=>{
        console.log(error);
        this.showLoader = false;
      });    
  }

  getMeta() {
    let metaTags = [];
    let keywords = [];
    let pageTitle = `Contact Us | ${this.common.getAppName()}`;
    
    this.meta.setTitle(pageTitle);
    metaTags.push({name:'author', content:this.common.getAuthor()});
    metaTags.push(
      {
        name:'description', 
        content:`If you have any questions, suggestions, want to advertise, report a bug, or have questions about our App, please let us know.`
      }
    );

    metaTags.push({
      name:'keywords', content:`contact, contact us, contact brew search`
    });

    // Facebook Tags
    let defaultFB = this.common.defaultOGMetaTags();
    metaTags.push({name:'fb:app_id', content:this.common.getFBAppId()});
    metaTags.push({name:'og:site_name', content:defaultFB.site_name});
    metaTags.push({name:'og:type', content:defaultFB.type});
    metaTags.push({name:'og:title', content:defaultFB.title});
    metaTags.push({name:'og:description', content:defaultFB.description});
    metaTags.push({name:'og:url', content:defaultFB.url});
    metaTags.push({name:'og:image', content:defaultFB.image});
    
    this.meta.addTags(metaTags);     
  }
}
