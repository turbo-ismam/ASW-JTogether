import {Component, Input, OnInit} from '@angular/core';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-participated-activity-card',
  templateUrl: './participated-activity-card.component.html',
  styleUrls: ['./participated-activity-card.component.scss']
})
export class ParticipatedActivityCardComponent implements OnInit {

  @Input() imageUrl: string | undefined;
  @Input() name: string | undefined;
  @Input() creator: string | undefined;
  @Input() place: string | undefined;
  @Input() dateTime: string | undefined;
  @Input() description: string | undefined;
  @Input() id: string | undefined;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

}
