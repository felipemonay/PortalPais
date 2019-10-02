import { Input, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-rematricula',
  templateUrl: './modal-rematricula.component.html',
  styleUrls: ['./modal-rematricula.component.scss']
})
export class ModalRematriculaComponent implements OnInit {
  @Input() idUnidade;

  constructor(
    public activeModal: NgbActiveModal
  ) {
    console.log('Unidade', this.idUnidade);
  }

  ngOnInit() {
    console.log('Unidade', this.idUnidade);
  }
  // document.getElementById("btnPrint").onclick = function () {
  //   printElement(document.getElementById("printThis"));
  // }

  printElement(elem) {
      // var domClone = elem.cloneNode(true);
      
      var $printSection = document.getElementById("printSection");
      
    //   if (!$printSection) {
    //       var $printSection = document.createElement("div");
    //       $printSection.id = "printSection";
    //       document.body.appendChild($printSection);
    //   }
      
    // $printSection.innerHTML = "";
    // $printSection.appendChild(domClone);
    window.print();
  }


}
