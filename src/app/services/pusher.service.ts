import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher : any
  channel : any

  constructor(private http : HttpClient) {

    this.pusher = new Pusher(environment.pusher.key, {
      cluster : environment.pusher.cluster,
      // @ts-ignore
      encrypted: true
    });
    this.channel = this.pusher.subscribe('channelName')
  }
}
export const environment = {
  production: false,
  pusher: {
    key: 'd31ce3a77e43f3466757',
    cluster: 'eu',
  }
};
