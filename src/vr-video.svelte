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
    
	export let video = '';
	export let camera = "default";

	let camera3d = null;
    let scene =  null;
    let canvasElement = null;
    let engine = null;
    let videoPlay = -1;

    function init(){
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

        switch (camera) {
            case 'oculus':
                camera3d = new BABYLON.OculusCamera('camera3d', new BABYLON.Vector3(0, 0, 0), scene);
                break;
            case 'cardboard':
                camera3d = new BABYLON.VRDeviceOrientationCamera('camera3d', new BABYLON.Vector3(0, 1, -15), scene);
                camera3d.rotation.x = 90;
                break;
            case 'vr':
                camera3d = new BABYLON.VirtualJoysticksCamera('camera3d', BABYLON.Vector3.Zero(), scene);
                break;
            default:
                camera3d = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 0, 0), scene);    
            };
        
        camera3d.attachControl(canvasElement, false);

        var sphereMaterial = new BABYLON.StandardMaterial("sphere", scene);
        sphereMaterial.backFaceCulling = false;
        sphereMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
        sphereMaterial.diffuseTexture = new BABYLON.VideoTexture('video', video, scene, true, true);

        // set a event to detect a click in the scene and play the video
        scene.onPointerDown = function () { 
            sphereMaterial.diffuseTexture.video.play(); 
        }

        window.addEventListener("dblclick", function (e) {	    
	        sphereMaterial.diffuseTexture.video.pause(); 
	    });
     
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:200}, scene);
        sphere.material = sphereMaterial;   
    };



</script>

<svelte:head>
	<script src="https://cdn.babylonjs.com/babylon.js" on:load={init}></script>
</svelte:head>

<main>
 <canvas id="renderCanvas" bind:this={canvasElement}></canvas>
</main>

<style>
	  #renderCanvas {
            width: 100%;
            height: 100%;
            /* touch-action: none; */
        }
</style>