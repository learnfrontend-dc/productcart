import { Component, TemplateRef, Renderer2, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


export class Product {
  public productname:string;
  public code: string;
  public cartprice: number;
  public price: number;
  public available: number;
  public qty: number;
  constructor(){
   
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  windowListener: Function;

  public productlist : Product[]; 
  public totalprice=0;
  public ngOnInit(): void {
    this.productlist=[];
  }
  constructor(private renderer: Renderer2) {
    this.windowListener =
        renderer.listen('window', 'message', this.processMessage.bind(this));
  }

  processMessage(event: Event) {
    const message = event as MessageEvent;
    let product=this.getProduct(message.data['productname']);
    if(product !== undefined) {
      product.qty=product.qty + 1;
      product.cartprice=product.cartprice+message.data['price'];
      this.totalprice=this.totalprice+message.data['price'];
     } else {
      product = new Product();
      product.qty=1;
      product.price=message.data['price'];
      product.productname=message.data['productname'];
      product.available=message.data['available'];
      product.code=message.data['code'];
      product.cartprice=message.data['price'];
      this.productlist.push(product);
      this.totalprice=this.totalprice+product.price;
    }
    
  }

  getProduct(productname) : Product {
    let productObj=undefined;
    for(let product of this.productlist) {
      if(product.productname === productname) {
        productObj=product; 
        break;
      }
  }
  return productObj;
  }
  ngOnDestroy() {
    this.windowListener();
  }
  increment(product) {
    if(product.qty >= 0 && product.qty < product.available) {
      product.qty =product.qty + 1;
      product.cartprice = product.cartprice + product.price;
      this.totalprice = this.totalprice + product.price;
      window.parent.postMessage(product, '*');
    }
  }
  
  decrement(product) {
    if(product.qty > 0 && product.qty <= product.available) {
      product.qty =product.qty - 1;
      product.cartprice = product.cartprice - product.price;
      this.totalprice = this.totalprice - product.price;
      window.parent.postMessage(product, '*');
    }
  }
}

//window.addEventListener('message', function(e) {
  //var message = e.data;
  //alert(message);
//});