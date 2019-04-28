import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'app/services/firebase.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'
import { MatDialog } from "@angular/material";
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-lectures',
  templateUrl: './view-lectures.component.html',
  styleUrls: ['./view-lectures.component.scss']
})
export class ViewLecturesComponent implements OnInit {

  department: any = '';
  stage: any = '';
  course: any = '';
  lectures: Array<any> = [];

  constructor(private route: ActivatedRoute, private firestoreService: FirebaseService, private dialog: MatDialog,
    private toastr: ToastrService) {
    this.department = this.route.snapshot.queryParams["department"];
    this.stage = this.route.snapshot.queryParams["stage"];
    this.course = this.route.snapshot.queryParams["course"];
  }

  ngOnInit() {
    if (this.department != '' && this.stage != '' && this.course != '') {
      this.firestoreService.getLectures(this.department, this.stage, this.course).subscribe(data => {
        this.lectures = data;
      })
    }
  }

  openDialog(id, lecid): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true')
        this.deleteLecture(id, lecid);
    });
  }

  deleteLecture(id, lecid) {
    this.firestoreService.deleteLecture('course/' + this.department + '/' + this.stage + '/' + this.course + '/' + id, lecid);
    this.toastr.success('تم الحذف', 'تم حذف بنجاح');
  }

  downloadLecture(url, name) {
    saveAs(url, name);
  }

}
