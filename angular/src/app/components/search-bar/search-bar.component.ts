import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  @Output() searchValue = new EventEmitter<string>();
  @Output() clearSearch: EventEmitter<void> = new EventEmitter();
  search?:string;
  inputValueSearch:string='';

  quest(){
    if(this.inputValueSearch.trim().length>=3){
      this.search = this.inputValueSearch;
      this.searchValue.emit(this.search);
    }
  }
  clear(){
    this.search = undefined;
    this.inputValueSearch = '';
    this.clearSearch.emit();
  }

}
