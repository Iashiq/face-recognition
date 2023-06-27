import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { FaceApiService } from "../services/face-api.service";
import { ApiResponse } from "../models/face.model";
import { CameraService } from "../services/camera.service";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css']
})
export class ContentComponent{
    imageString = '';
    faceApiResponse!: Observable<ApiResponse>;
    subscriptionKey!: string;

    constructor(
        private faceApiService: FaceApiService,
        private cameraService: CameraService

    ){}
    
    processImage(){
    this.faceApiResponse = this.cameraService.getPhoto().pipe(
        switchMap((base64Image: string) =>{
            this.imageString = base64Image;
            return this.faceApiService.imageScanner(
                this.subscriptionKey,
                base64Image
            );
        })
    );
    }
}