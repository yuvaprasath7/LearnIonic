import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profilePicture: any
  params: any;
  form: FormGroup | any
  dark = false;
  constructor(public actionSheetController: ActionSheetController, public platform: Platform, public translate: TranslateService,) {
    translate.addLangs(['en', 'Hindi', 'Tamil', 'ban']);
    localStorage.setItem('locale', 'en');
    translate.setDefaultLang('en');

  }
  ngOnInit(): void {
    this.FormValidation();
    this.changeLang('en');
  }

  FormValidation() {
    this.form = new FormGroup({
      FirstName: new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-Z]+$')]),
      LastName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]),
      MobilNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      Address: new FormControl('', [Validators.required]),
    })
  }

  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }



  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile Picture Upload',
      buttons: [{
        // }, {
        //   text: 'Take Photo',
        //   icon: 'camera',
        //   handler: () => {
        //     this.takepicture();
        //   },
      }, {
        text: 'Select from gallery',
        icon: 'images',
        handler: () => {
          this.pickImage();
        },
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.profilePicture = null;
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }
  async pickImage() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    this.profilePicture = image.dataUrl;
  }
  // async takepicture() {
  //   const image = await Camera.getPhoto({
  //     quality: 100,
  //     allowEditing: false,
  //     resultType: CameraResultType.DataUrl,
  //     source: CameraSource.Camera
  //   });
  //   this.profilePicture = image.dataUrl;
  // }


  get f() {
    return this.form.controls;
  }
  Onsubmit() {

  }
}
