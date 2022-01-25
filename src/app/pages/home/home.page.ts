import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { NetworkPage } from '../network/network.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private modalController: ModalController
  ) {
    this.scanQR();
  }

  async showModal(networkData){
    const detailsModal = await this.modalController.create({
      component: NetworkPage,
      componentProps: { "networkData": networkData }
    });
    detailsModal.onDidDismiss().then((response) => {
      console.log(response);
      this.scanQR();
    });
    return await detailsModal.present();
  }

  scanQR(){
    this.barcodeScanner.scan().then(barcodeData => {
      const data = barcodeData.text.split(";");
      const networkData = { "ssid": data[1].split(":")[1], "password": data[2].split(":")[1] }
      console.log(networkData);
      this.showModal(networkData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
