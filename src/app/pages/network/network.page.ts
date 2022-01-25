import { Component, OnInit, Input } from '@angular/core';
import { Hotspot } from '@ionic-native/hotspot/ngx';

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],
})
export class NetworkPage implements OnInit {

  @Input() networkData;
  public message;

  constructor(private hostpot: Hotspot) {
    console.log(this.networkData);
  }

  ngOnInit() {
  }

  connect(){
    this.hostpot.connectToWifi(this.networkData.ssid, this.networkData.password).then((data) => {
      this.message = data;
    }, (error) => {
      this.message = error;
    });
  }
}
