import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {ActionEvent, productActionsType} from "../../../../state/product.state";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product?:Product |null;
  @Output() productsEventEmetter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.productsEventEmetter.emit({type:productActionsType.SELECT_PRODUCT,payload:product})
  }

  onDelete(product: Product) {
    this.productsEventEmetter.emit({type:productActionsType.DELETE_PRODUCT,payload:product})
  }

  onEdit(product: Product) {
    this.productsEventEmetter.emit({type:productActionsType.EDITE_PRODUCT,payload:product})
  }
}
