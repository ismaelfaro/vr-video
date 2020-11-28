

import BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export default class Viewer360 {
    constructor(canvasElement, video, cameraType) {
        this.engine = new BABYLON.Engine(canvasElement, true);
        this.engine.setSize(window.innerWidth, window.innerHeight);
        this.canvasElement = canvasElement;
        this.videoPlay = -1;
        this.video = video;
        this.cameraType = cameraType;
        
    


        window.addEventListener('resize', function () {
                                    this.engine.resize(); });
        }
    run(){
           this.engine.runRenderLoop(function () {
                        this.scene.render();});
    }
         

    createScene() {
        this.scene = new BABYLON.Scene(this.engine);

        this.scene.clearColor = new BABYLON.Color3(0, 0, 0);

        switch (this.cameraType) {
            case 'oculus':
                this.camera = new BABYLON.OculusCamera('camera', new BABYLON.Vector3(0, 0, 0), this.scene);
                break;
            case 'cardboard':
                this.camera = new BABYLON.VRDeviceOrientationCamera('camera', new BABYLON.Vector3(0, 1, -15), this.scene);
                this.camera.rotation.x = 90;
                break;
            case 'vr':
                this.camera = new BABYLON.VirtualJoysticksCamera('camera', BABYLON.Vector3.Zero(), this.scene);
                break;
            default:
                this.camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, 0), this.scene);    
            };
        
        this.camera.attachControl(this.canvasElement, false);

        var sphereMaterial = new BABYLON.StandardMaterial("sphere", this.scene);
        sphereMaterial.backFaceCulling = false;
        sphereMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        console.log('=====',this.video);
        sphereMaterial.diffuseTexture = new BABYLON.VideoTexture('video', this.video, this.scene, true, true);

        // set a event to detect a click in the scene and play the video
        this.scene.onPointerDown = function () { 
            this.videoPlay = this.videoPlay*-1;
            if (this.videoPlay==1){
                sphereMaterial.diffuseTexture.video.play(); 
            }else{
                sphereMaterial.diffuseTexture.video.pause(); 
            }
             
        }

        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:200}, this.scene);
        sphere.material = sphereMaterial;   
        
    }
    
    init_text(){
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var textblock = new GUI.TextBlock();
        textblock.text = "Press ctrl/cmd + c after moving the\n pointer to either sphere or box !";
        textblock.fontSize = 24;
        textblock.top = -100;
        textblock.color = "white";
        advancedTexture.addControl(textblock);
    }   
}
