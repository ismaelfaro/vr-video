# VR-video
360 video viewer in Svelte Component and Web Component with Mobile and VR support.

It use babylonjs engine. Check more information about  [Babylonjs] (https://www.babylonjs.com/)

Documentation and Demo [https://ismaelfaro.github.io/vr-video](http://ismaelfaro.github.io/vr-video)

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

Clicking in the screen you can play or pause the video.
