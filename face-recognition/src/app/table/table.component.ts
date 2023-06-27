import { Component, OnInit, Input } from '@angular/core';
import { ApiResponse } from '../models/face.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() faceApiResponse!: ApiResponse;
  constructor() {}

  ngOnInit() {}
}
