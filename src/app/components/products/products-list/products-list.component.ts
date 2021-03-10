import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionEvent, AppDataState, DataStateEnum, productActionsType} from "../../../state/product.state";
import {Observable} from "rxjs";
import {Product} from "../../../model/product.model";
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  // le $ signifie que c'est une Observble
  @Input() productsInput$?: Observable<AppDataState<Product[]>> | null;
  @Output() productsEventEmetter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum=DataStateEnum

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.productsEventEmetter.emit({type:productActionsType.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product) {
    this.productsEventEmetter.emit({type:productActionsType.DELETE_PRODUCT,payload:product});
  }

  onEdit(product: Product) {
    this.productsEventEmetter.emit({type:productActionsType.EDITE_PRODUCT,payload:product});
  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmetter.emit($event);
  }
}
