import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent {
  @Input() titulo;
  @Input() mensagem;

  constructor(public activeModal: NgbActiveModal) {}
}
