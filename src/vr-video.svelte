<svelte:options tag="vr-video" immutable={true} />

<script>
/*
The `VR-video` virtual reality 360 video viewer. It use a BabylonJS library

    common use:

      <vr-video video="[Video URL]" ></vr-video>

    change camera setting:

      cardboard:
        <vr-video camera="cardboard" video="[Video URL]" ></vr-video>

      vr:
        <vr-video camera="vr" video="[Video URL]" ></vr-video>

      Oculus:
        <vr-video camera="oculus" video="[Video URL]" ></vr-video>

*/
    
	export let video = "video360avion480p.mp4";
	export let cameraType = "default";

	let camera = null;
    let scene =  null;
    let canvasElement = null;
    let engine = null;
    let videoPlay = -1;

    
    function init(){
        console.log('demo')
        engine = new BABYLON.Engine(canvasElement, true);
        engine.setSize(window.innerWidth, window.innerHeight);

        createScene();

        engine.runRenderLoop(function () {
                        scene.render();});

        window.addEventListener('resize', function () {
                                    engine.resize(); });

    };

	function createScene(){
           
        scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color3(0, 0, 0);

        switch (cameraType) {
            case 'oculus':
                camera = new BABYLON.OculusCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
                break;
            case 'cardboard':
                camera = new BABYLON.VRDeviceOrientationCamera('camera', new BABYLON.Vector3(0, 1, -15), scene);
                camera.rotation.x = 90;
                break;
            case 'vr':
                camera = new BABYLON.VirtualJoysticksCamera('camera', BABYLON.Vector3.Zero(), scene);
                break;
            default:
                camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, 0), scene);    
            };
        
        camera.attachControl(canvasElement, false);

        var sphereMaterial = new BABYLON.StandardMaterial("sphere", scene);
        sphereMaterial.backFaceCulling = false;
        sphereMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        sphereMaterial.diffuseTexture = new BABYLON.VideoTexture('video', video, scene, true, true);

        // set a event to detect a click in the scene and play the video
        scene.onPointerDown = function () { 
            videoPlay = videoPlay*-1;
            if (videoPlay==1){
                sphereMaterial.diffuseTexture.video.play(); 
            }else{
                sphereMaterial.diffuseTexture.video.pause(); 
            }
             
        }

        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:200}, scene);
        sphere.material = sphereMaterial;   
        
       

    };

    function init_text(){
        // var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        // var textblock = new BABYLON.GUI.TextBlock();
        // textblock.text = "Press ctrl/cmd + c after moving the\n pointer to either sphere or box !";
        // textblock.fontSize = 24;
        // textblock.top = -100;
        // textblock.color = "white";
        // advancedTexture.addControl(textblock);
    }

</script>

<svelte:head>
	<script src="https://cdn.babylonjs.com/viewer/babylon.viewer.js" on:load={init}></script>
	<!-- <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js" on:load={init_text} ></script> -->
</svelte:head>

<main>
 <canvas id="renderCanvas" bind:this={canvasElement}></canvas>
</main>

<style>
	  #renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
        }
</style>