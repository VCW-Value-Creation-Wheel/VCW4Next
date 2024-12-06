import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '@core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {

  @Output() clickEvent = new EventEmitter<number>();
  @Input() project: Project;
  @Input()
  set photoUrl(value: string) {
    this.photo = value;
    if (!this.photo) {
      this.photo = 'https://res.cloudinary.com/deimospt/image/upload/v1659628047/backgrounds/services_pvcsuf.jpg';
    }
  }

  get photoUrl() {
    return this.photo;
  }

  photo: string;

  constructor() {}



  ngOnInit(): void {

  }

  onClickEvent() {
    this.clickEvent.emit(this.project.id);
  }
}
