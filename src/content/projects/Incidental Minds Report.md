---
title: We Resist
slug: we-resist
category: Professional Experience
description: Report documenting my work as a 3D / Technical Artist at Incidental Minds.
thumbnail: /projects/we-resist/render02.png
heroImage: /projects/we-resist/render02.png
tools:
  - Unreal Engine 5
  - Blender
  - Substance Painter
order: 5
tags:
  - 3D_Modelling
  - Procedural_Generation
---
:::split
## Overview

This report documents selected work and responsibilities as 3D / Technical Artist at Incidental Minds for a game We Resist. I initially joined the project as a 3D artist and later transitioned to a technical artist role, creating procedural tools and troubleshooting errors with importing, animations and other areas in the Unreal Engine 5 pipeline.
I also carried out on-site reference gathering in the area where the game was set, for historical architectural references.
:::next
![](/projects/we-resist/render01.png)
:::end
:::split
## 3D Modelling

The aim for We Resist was to capture historically accurate architecture elements while leveraging oil-painting-like style for texturing, while keeping the assets mostly low poly.

My work mainly consisted of modelling houses and other environmental props. The assets were based on real-life examples with attention to scale and player movement constrains. 

Textures were created by other members of the team*
:::next
![References](/projects/we-resist/references01.png)
:::end
<video src="/projects/we-resist/housesvideo.mp4" controls muted loop playsinline></video>
:::split
![Close-up render of one of the houses](/projects/we-resist/house01.png)
:::next
![Fence and environmental props models](/projects/we-resist/fences.png)
:::end
:::split
## Procedural Generation
PCG was mainly used for the creation of fences and electric poles. The main aim was to provide level designers with effective and time-saving tools.

The spline-based fences also included procedural spawning of NavLink proxies and colliders in order to enable NPCs to vault across them. They also included Landscape Patches making sure the landscape underneath was always in level with the fence.
:::next
## Procedural Electric Poles
The electric poles system required a more complex approach and consisted of a mix of blueprint logic and Unreal's PCG system. The goal was to create several main lines with sub-branches that would connect directly to houses.

This was achieved with the use of Mesh Sockets and Collision-Detection system that found the nearest non-occluded connection available inside of Construction Script. The cables were made using Unreal's Cable Component.
:::end
![PCG tools overview](/projects/we-resist/pcg.png)
<video
  src="/projects/we-resist/polesvideo.mp4"
  title="Procedural electric pole framework"  controls  muted  loop playsinline></video>
<video src="/projects/we-resist/fencevideo.mp4" controls muted loop playsinline></video>
:::split
![Wooden fence PCG graph](/projects/we-resist/fencegraph.png)
:::next
![Sub-branch electric pole logic](/projects/we-resist/branchpolebp.png)
:::end
:::split
## Shaders 
Since the project leveraged mostly hand-painted textures, the required shader work was minimal. Nontheless my work consisted of setting up a paintable landscape material & creating a plaster normal shader, simulating the rough plaster used in our historical period. I also created a tint randomization functionality for the houses increasing their visual variation and speeding up the pace of development.
:::next
![House tint variation](/projects/we-resist/housevariation.png)
:::end

