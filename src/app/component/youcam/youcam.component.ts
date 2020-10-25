import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UploadImageService } from 'src/app/services/uploadimageservice.service';

@Component({
  selector: 'app-youcam',
  templateUrl: './youcam.component.html'
})
export class YouCamComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  message = '';

  public fileInfos: Observable<any>;

  constructor(private uploadService: UploadImageService) { }

  async ngOnInit() {
    await this.getFiles();
  }

  async upload(e) {

    if (e.target.files.length === 0) {
      console.log('No file selected!');
      return;
    } else {
      this.selectedFiles = e.target.files;
    }

    this.currentFile = this.selectedFiles.item(0);
    console.log(this.currentFile.type);
    if (this.currentFile.type !== 'image/jpeg') {
      alert('Only image file types allowed: image/jpeg');
      return;
    }
    await (await this.uploadService.upload(this.currentFile))
    .subscribe(async event => {
      if (event instanceof HttpResponse) {
        this.message = event.body.message;
        await this.getFiles();
        alert(this.message);
      }
    },
    err => {
      this.message = 'Could not upload the file!';
      this.currentFile = undefined;
      alert(this.message);
    });

    this.selectedFiles = undefined;
  }

  async getFiles(){
    this.fileInfos = await this.uploadService.getFiles();
    console.log(JSON.stringify(this.fileInfos));
  }
}
