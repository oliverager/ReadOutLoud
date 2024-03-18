import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';
import { ResponseDto } from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  createNewImageUrlForm = this.fb.group({
    imageUrl: ['', Validators.required],
  });

  messageFromServer: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  async submit() {
    try {
      const obs = this.http.post<any>(environment.baseUrl + '/receiving', { imgUrl: this.createNewImageUrlForm.controls.imageUrl.value });
      const result = await firstValueFrom(obs);

      // Assign the responseData string to the messageFromServer variable
      this.messageFromServer = result.responseData;

      // Manually trigger change detection
      this.cdr.detectChanges();

      const toast = await this.toastController.create({
        message: result.messageToClient || 'Text extracted successfully.',
        duration: 1233,
        color: 'success'
      });
      toast.present();
    } catch (e) {
      console.error(e);
      if (e instanceof HttpErrorResponse) {
        const toast = await this.toastController.create({
          message: e.error.messageToClient || 'Error occurred while processing the request.',
          duration: 1233,
          color: 'danger'
        });
        toast.present();
      }
    }
  }


  listen() {

  }
}
