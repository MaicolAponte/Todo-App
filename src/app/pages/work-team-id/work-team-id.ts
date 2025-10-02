import { Component } from '@angular/core';
import { WorkTeamInfo } from '../../components/work-team-info/work-team-info';
import { WorkTeamParticipants } from '../../components/work-team-participants/work-team-participants';
import { Tasks } from '../../components/tasks/tasks';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-work-team-id',
  imports: [WorkTeamInfo,WorkTeamParticipants,Tasks, RouterModule],
  templateUrl: './work-team-id.html',
  styleUrl: './work-team-id.css'
})
export class WorkTeamId {
  idteam: string | null = null;
  activeTab: string = 'tareas'; // por defecto muestra tareas

  constructor(private route: ActivatedRoute) {
    this.idteam = this.route.snapshot.paramMap.get('idteam');
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
