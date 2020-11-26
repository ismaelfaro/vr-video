<svelte:options tag="vr-video" immutable={true} />

<script>

    // import { BABYLON } from 'babylonjs'
    
	export let video = "http://ismaelfaro.github.io/vr-video/components/vr-video/demo/video360avion480p.mp4";
	export let camera = "default";

	let _cameraObject = null;
    let _sceneObject =  null;
    let _sceneLoader =  null;
    let canvasElement = null;
    let _engine = null;
// 	let	_lights = {};
        
    
    function mount(){
        console.log('demo')
        _engine = new BABYLON.Engine(canvasElement, true);
        _engine.setSize(window.innerWidth, window.innerHeight);
        createScene();
        _engine.runRenderLoop(function () {
                        _sceneObject.render();});

    };

	function createScene(){
           
        _sceneObject = new BABYLON.Scene(_engine);

        _sceneObject.clearColor = new BABYLON.Color3(0, 0, 0);

        switch (camera) {
            case 'oculus':
                _cameraObject = new BABYLON.OculusCamera('camera', new BABYLON.Vector3(0, 0, 0), _sceneObject);
                break;
            case 'cardboard':
                _cameraObject = new BABYLON.VRDeviceOrientationCamera('camera', new BABYLON.Vector3(0, 1, -15), _sceneObject);
                _cameraObject.rotation.x = 90;
                break;
            case 'vr':
                _cameraObject = new BABYLON.VirtualJoysticksCamera('camera', BABYLON.Vector3.Zero(), _sceneObject);
                break;
            default:
                _cameraObject = new BABYLON.ArcRotateCamera('camera', 0, 0, 100, BABYLON.Vector3.Zero(), _sceneObject);
            };
        
        _cameraObject.attachControl(canvasElement, false);

        var redMat = new BABYLON.StandardMaterial("redMat", _sceneObject);
        redMat.backFaceCulling = false;
        redMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    
        var redSphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:200}, _sceneObject);
        redSphere.material = redMat;
        redSphere.material.diffuseTexture = new BABYLON.VideoTexture('video', video, _sceneObject, true);
        // redSphere.position = lightRed.position;
    
        // _sceneLoader = BABYLON.SceneLoader.ImportMesh('', '', 'build/sphere.gltf',_sceneObject, function (newMeshes) {
        //     console.log(newMeshes)
        //     _sceneLoader = newMeshes[0];
        //     _sceneLoader.material = null;
        //     _sceneLoader.material = new BABYLON.StandardMaterial('texture1', _sceneObject);
        //     _sceneLoader.material.backFaceCulling = false;
        //     _sceneLoader.material.emissiveColor = new BABYLON.Color3(10, 1, 0);
        //     _sceneLoader.material.ambientColor = new BABYLON.Color3(2, 0.98, 0.53);

        //     // _sceneLoader.material.emissiveTexture = new BABYLON.VideoTexture('video', [video], 1024, _sceneObject, true);
        // });
    };



window.addEventListener('resize', function () {
                                    _engine.resize(); });

function init(){
    console.log('init')
}

</script>


<svelte:head>
	<script src="https://cdn.babylonjs.com/viewer/babylon.viewer.js" on:load={mount}></script>
</svelte:head>



<main>
 <!--  -->
 the canvas is there
 <canvas id="renderCanvas" bind:this={canvasElement}></canvas>
</main>

<style>
	  #renderCanvas {
            width: 100%;
            height: 100%;
            touch-action: none;
        }
</style>