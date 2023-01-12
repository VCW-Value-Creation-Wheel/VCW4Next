import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '@core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;
  @Output() clickEvent = new EventEmitter<number>();

  photo: string;

  constructor() {}

  ngOnInit(): void {
    this.photo = this.project.thumbnailURL ??
                'https://res.cloudinary.com/deimospt/image/upload/v1659628047/backgrounds/services_pvcsuf.jpg';
  }

  onClickEvent() {
    this.clickEvent.emit(this.project.id);
  }
}
