import { Component } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  displayImage(event: any) {
    const image = document.getElementById('uploaded-image') as HTMLImageElement;
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          image.src = reader.result;
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
