import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { WindowService } from '../../lib/window.service';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-question',
  templateUrl: './lhc-item-question.component.html',
  styleUrls: ['./lhc-item-question.component.css']
})
export class LhcItemQuestionComponent implements OnInit {


  @Input() item;
  @Input() options;
  @ViewChild("deInput") deInputElement: ElementRef<any>; 

  eleStyle: object = null;
 
  showErrorPopover: boolean = false;
  
  //popoverStyle: object = {'background-color': '#fcf8e3'}

  constructor(
    private winService: WindowService,
    public lhcDataService: LhcDataService,
  ) {     
    winService.windowWidth.subscribe(updatedWidth => {
      let viewMode = winService.getViewMode();
      let viewModeClass = lhcDataService.getItemViewModeClass(this.item, viewMode)
      this.eleStyle = viewModeClass === "lhc-item-view-lg" ? {"width": updatedWidth/2 + "px"} : null;
    });  

  }

  ngOnInit(): void {
  }
  
  checkErrors(): boolean {
    let show = false;
    if (this.item._validationErrors && this.item._validationErrors.length > 0) {
      show = true;
    }

    this.showErrorPopover = show;
    console.log("checkErrors: " + show)
    return show;
  }

  
}
