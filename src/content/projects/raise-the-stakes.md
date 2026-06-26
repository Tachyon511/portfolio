---
title: Raise the Stakes
slug: raise-the-stakes
category: Game Development
description: Real-time Castle Defense Strategy game where you play as a vampire trying to defend his castle from an angry mob of villagers. Developed during a 48 hour gamejam.
thumbnail: /projects/raise-the-stakes/thumbnail.png
heroImage: /projects/raise-the-stakes/thumbnail.png
tools:
  - Unreal Engine 5
  - Blender
featured: true
order: 4
---

## Overview

In Raise the Stakes, the player tried to defend his castle by building towers, while enduring waves of enemies. The game was created during the 48 hour Klagenfurt GSE Jam, hosted by my faculty, with subsequent bug fixes and improvements after the gamejam.

The game was developed in Unreal Engine 5.6 and I acted as a head programmer, while also managing shaders and optimization. The other members of the team took care of level & game design.

The project uses mainly downloaded asset packs with the addition of few miscellaneous props I modelled.*
<video
  src="/projects/raise-the-stakes/gameplay-video.mp4"
  title="Gameplay preview"  controls  muted  loop playsinline></video>
## Programming
The development approach & proccess was heavily influenced by the gamejam time restriction, which meant the code had to be simple, easily iterable and repeatable. The programming was done via Blueprints.

![Graph Code Overview](/projects/raise-the-stakes/graph.png)

## Shaders & Visual Effects

<video
  src="/projects/raise-the-stakes/dynamic-shaders.mp4"
  title="Dynamic shaders: Magic Tower and Build Overlay Material"  controls  muted  loop playsinline></video>

<video
  src="/projects/raise-the-stakes/bat-tower-video.mp4"
  title="Bat Tower attack"  controls  muted  loop playsinline></video>
![](/projects/raise-the-stakes/bat-attack.png)
![Landscape Material with UV bombing & slope mask](/projects/raise-the-stakes/landscape.png)

## Opimization
The project required the use of a high number of Skeletal Meshes. Due to this we had to simplify other parts of the project to keep the scene performant and stable.

Optimizations:
- Significant use of LODs
- Lumen quality reduction
- Use of a Local Fog Volume instead of Volumetric Fog
- Use of a Sky Light cubemap as a primary light source instead of a Directional Light

