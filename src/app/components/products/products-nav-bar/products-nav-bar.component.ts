import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, productActionsType} from "../../../state/product.state";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
  @Output() productEventEmitter:EventEmitter<ActionEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.productEventEmitter.emit({type:productActionsType.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    this.productEventEmitter.emit({type:productActionsType.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    this.productEventEmitter.emit({type:productActionsType.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {
    this.productEventEmitter.emit({type:productActionsType.NEW_PRODUCTS});
  }

  onSearch(dataForm: any) {
    this.productEventEmitter.emit({type:productActionsType.SEARCH_PRODUCTS,payload:dataForm});
  }
}
