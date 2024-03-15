import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public toastController: ToastController
  ) {}

  async submit() {

    try {
      const obs = this.http.post(environment.baseUrl + '/receiving', {imgUrl:this.createNewImageUrlForm.controls.imageUrl.value!})
      const result = await firstValueFrom<ResponseDto<string>>(obs);
      console.log(result)
        const toast = await this.toastController.create({
          message: 'Success',
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
}
