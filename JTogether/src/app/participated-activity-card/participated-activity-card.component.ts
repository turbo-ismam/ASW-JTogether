import {Component, Input, OnInit} from '@angular/core';
import {JRouter} from '../jrouter.service';
import {DataService} from '../data.service';
import {SnackBarService} from '../snack-bar.service';
import {TokensManagerService} from '../tokens-manager.service';
import {UtilityService} from '../utility.service';

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
  isVisible = true;

  constructor(
    private route: JRouter,
    private dataService: DataService,
    private snackBar: SnackBarService,
    private tokensManagerService: TokensManagerService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this.tokensManagerService.isLoggedIn(() => {
      this.dateTime = this.utilityService.formatDateTime(this.dateTime as string);
    });
  }

  startChatting(): void{
    this.route.activityChat(this.id as string);
  }

  removeParticipation(): void{
    this.tokensManagerService.getAccessToken()
      .then(t => this.dataService.deleteParticipation({activity_id: this.id as string}, t))
      .then(_ => this.isVisible = false)
      .catch(e => this.snackBar.errorSnack(e));
  }
}
