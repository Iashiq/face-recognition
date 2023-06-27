import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { ApiResponse } from '../models/face.model';

@Injectable()
export class FaceApiService{

    private endpoint = 'https://face-reco-api.cognitiveservices.azure.com/face/v1.0/detect';

    constructor (private httpClient: HttpClient){}

    imageScanner(subscriptionKey: string, imageTaken: string){
        const headers = this.getHeaders(subscriptionKey);
        const params = this.getParams();
        const blob = this.makeBlob(imageTaken);
        
        return this.httpClient.post<ApiResponse>(
            this.endpoint, 
            blob,
            {
               headers,
               params,
            }
        );
    }

    private makeBlob(dataURL: string){
        const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
  
      return new Blob([uInt8Array], { type: contentType });
    }

    private getHeaders(key: string){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/octet-stream');
        headers = headers.set('Ocp-Apim-Subscription-Key', key);

        return headers;
    }

    private getParams() {
        const httpParams = new HttpParams()
          .set('returnFaceId', 'true')
          .set('returnFaceLandmarks', 'false')
          .set(
            'returnFaceAttributes',
            'age,gender,smile,emotion,hair'
          );
    
        return httpParams;
      }
}