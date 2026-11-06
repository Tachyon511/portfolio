---
title: Procedural Spider Tank Animation System
slug: procedural-spider
category: Procedural Animation
description: Dynamic procedural animation system for a six-legged spider-tank developed in Unreal Engine  with a combination of Control Rig, Blueprint and Animation Blueprint functionality
thumbnail: /projects/procedural-spider/hero.png
heroImage: /projects/procedural-spider/hero.png
tools:
  - Unreal Engine 5
  - Blender
order: 1
tags:
---

## Overview
Procedural spider tank animation & movement system developed for an ongoing student game project. The system combines Control Rig, Blueprint and Animation Blueprint functionality.

The goal was to create a dynamic system that would enable the control and movement of a hexapod spider-tank character that could climb vertical surfaces and remain playable using procedural animation.
<video src="/projects/procedural-spider/walking.mp4" controls muted loop playsinline></video>
:::split
## Animation
The animation system is built inside Unreal's Control Rig and uses Inverse Kinematics with a dynamic leg targeting system. It is centered mostly around interpolation and Line trace logic and driven by a time-based framework and velocity. Check the graph for more technical details
:::next
![](/projects/procedural-spider/controlriggraph.png)
:::end
<video src="/projects/procedural-spider/controlrigdemo.mp4" controls muted loop playsinline></video>
:::split
## Movement
The main goal of the movement system was to enable the character to traverse uneven and vertical surfaces and proved to be the hardest part of the project. The main issues stemmed from the conflicts of coordinate spaces of individual elements: World / LocalActor / ControlRig.

The resulting system separates Actor Rotation and Character Mesh Rotation. The Actor rotation gets calculated by detecting and interpolating to the surface normal. The Mesh rotation gets influenced by Mouse Input directly inside Control Rig. This enables the Mesh to rotate inside of the Actor, which deals with the surface interpolation independently reducing coordinate system conflicts.
:::next
![](/projects/procedural-spider/surfacelerpgraph.png)
:::end
<video src="/projects/procedural-spider/surfacelerping.mp4" controls muted loop playsinline></video>
<video src="/projects/procedural-spider/verticalclimb.mp4" controls muted loop playsinline></video>
:::split
## Control & Input
The Input system was the result of the implementation of the previous two areas. The Player Camera is parented directly to one of the Cannon Bone Sockets and since the Mesh itself is directly controlled by mouse input we do not have to calculate any LookAt Rotations for the mesh. 

This approach enables straightforward true aim control and further reduces potential coordinate system conflicts like using Unreal's native Player Controller which works in the World Coordinate System.
:::next
The Mouse Input values get parsed into the Animation Blueprint. The Pitch is controlled by rotating both the Pelvis and Cannon Bones to enable sufficient range of motion. This approach influences only the Pitch of the Mesh Bones and the Camera and does not interfere with the Actor's Surface Interpolation System.

The Yaw is made by rotating the Turret Bone to which the Cannon Bones, and our Camera, are parented. For simulating a turret-hull tank movement, the Pelvis Yaw gets interpolated to the Turret Yaw with a bit of delay and slower speed, which also helps the Animation system to catch up with leg movement.
:::end
<video src="/projects/procedural-spider/viewcontrols.mp4" controls muted loop playsinline></video>