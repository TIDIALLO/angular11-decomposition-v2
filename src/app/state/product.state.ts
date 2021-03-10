export enum productActionsType{
  GET_ALL_PRODUCTS= "[Product] Get all products",
  GET_AVAILABLE_PRODUCTS= "[Product] Get avaiable products",
  GET_SELECTED_PRODUCTS= "[Product] Get selected products",
  SEARCH_PRODUCTS= "[Product] Search products",
  NEW_PRODUCTS= "[Product] New products",
  SELECT_PRODUCT= "[Product] Select products",
  DELETE_PRODUCT= "[Product] delete products",
  EDITE_PRODUCT= "[Product] Edit products"
}
export interface ActionEvent{
  type:productActionsType,
  payload?:any
}

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  dataState:DataStateEnum,
  data?:T,
  errorMessage?:string
}
