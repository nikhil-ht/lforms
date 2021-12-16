import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-validate',
  templateUrl: './lhc-validate.component.html',
  styleUrls: ['./lhc-validate.component.css']
})
export class LhcValidateComponent implements OnInit, OnChanges {

  @Input() item: any;
  @Input() value: any;

  constructor(private lhcDataService: LhcDataService){
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
  }

  /**
   * Invokded when the properties change
   * @param changes changes.prop contains the old and the new value...
   */
  ngOnChanges(changes) {
    if (changes.value && !changes.value.firstChange) {
      let lfData = this.lhcDataService.getLhcFormData()

      // check validation on the item
      setTimeout(() => {
        //console.log(this.item.value)
        lfData._checkValidations(this.item);
        //console.log(this.item._validationErrors)
        if (this.item._validationErrors) {
          this.item._validationErrors.forEach(error => {
            this.lhcDataService.sendMsgToScreenReader(`${this.item.question} ${error}`)
          });
        }
      },1)
      
    }

  }
}