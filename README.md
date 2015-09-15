# VR-video
Polymer Web Component to create virtual reality 360 video presentation.

It use babylonjs engine. Check more information about  [Babylon.css] (http://daneden.me/animate)

Documentation and Demo [http://ismaelfaro.github.io/vr-video](http://ismaelfaro.github.io/vr-video)

## Usage

common use:

    <vr-video video="[Video URL]" ></vr-video>

change camera setting:

  * cardboard:

        <vr-video camera="cardboard" video="[Video URL]" ></vr-video>

  * vr:

        <vr-video camera="vr" video="[Video URL]" ></vr-video>

  * Oculus:

        <vr-video camera="oculus" video="[Video URL]" ></vr-video>

## User interaction
the user can mmove the camera using the mouse or drag in touch screens. If you use the CardBoard or Oculus camera you can use the device orientation to move arounf the 360 video.

## TODO: 
 Replace Babylon 2.0 to 2.1
