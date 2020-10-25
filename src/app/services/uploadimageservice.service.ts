import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  async upload(file: File): Promise<Observable<HttpEvent<any>>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return await this.http.request(req);
  }

  async getFiles(): Promise<Observable<any>> {
    return await this.http.get(`${this.baseUrl}/files`);
  }
}
