import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, productActionsType} from '../../state/product.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products$:Observable<AppDataState<Product[]>> |null=null;
   readonly DataStateEnum=DataStateEnum;

   constructor(private productsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.products$= this.productsService.getAllProducts().pipe(
        map(data=>{
          console.log(data);
          return ({dataState:DataStateEnum.LOADED,data:data})
        }),
        startWith({dataState:DataStateEnum.LOADING}),
        catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetSelectedProducts() {
    this.products$= this.productsService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$= this.productsService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$= this.productsService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p: Product) {
     let v=confirm("Etes vous sûre?");
     if(v==true)
    this.productsService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    //if ($event == "produits"){this.onGetAllProducts();}
    switch ($event.type){
      case productActionsType.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case productActionsType.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case productActionsType.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case productActionsType.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case productActionsType.NEW_PRODUCTS:this.onNewProduct();break;
      case productActionsType.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case productActionsType.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case productActionsType.EDITE_PRODUCT:this.onEdit($event.payload);break;
    }
  }
}
