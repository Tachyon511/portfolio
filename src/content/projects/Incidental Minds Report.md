---
title: Incidental Minds Experience Report
slug: incidental-minds-report
category: Professional Experience
description: A short report documenting my work as a 3D / Technical Artist focused on Unreal Engine implementation, environment assets, shaders and procedural tools.
thumbnail: /projects/we-resist/render02.png
heroImage: /projects/we-resist/render02.png
tools:
  - Unreal Engine 5
  - Blender
  - Substance Painter
order: 3
---

## Overview

This report documents selected work and responsibilities from my 3D / Technical Artist experience at Incidental Minds. I initially joined the project as a 3D artist and later transitioned to a technical artist role, creating procedural tools and shaders while also troubleshooting various errors in the Unreal Engine 5 pipeline. I also carried out on-site reference gathering in the area where the game was set, focusing on historical architectural details and elements.

We Resist is a third-person, story-driven game set in Slovakia in 1942. It follows a group of guerrilla fighters resisting the Nazi regime. The game combines a strategic layer, where players build camps, gather resources, and manage soldiers, with tactical third-person missions that give players direct control over their squad.

The project focuses on historical authenticity in both its narrative and worldbuilding. It was developed into a playable demo with financial support from the Slovak Arts Council.
![](/projects/we-resist/render01.png)

## 3D Modelling

The aim for We Resist was to capture historically accurate architecture elements while leveraging oil-painting-like style for texturing, while keeping the assets mostly low poly. Significant time was also allocated to gathering accurate on-site or archived references.
![References](/projects/we-resist/references01.png)

My work mainly consisted of modelling houses and fences with addition to other environmental props. The assets were based on real-life examples with attention to scale and player movement constrains. 

Textures were created by other members of the team*
<video src="/projects/we-resist/housesvideo.mp4" controls muted loop playsinline></video>

![Close-up render of one of the houses](/projects/we-resist/house01.png)
![Fence and environmental props models](/projects/we-resist/fences.png)
## Procedural Generation

PCG was mainly used for the creation of fences and electric poles. The main aim was to provide level designers with effective and time-saving tools. The fences also included procedural spawning of NavLink proxies and colliders in order to enable NPCs to vault across them. They also included Landscape Patches making sure the landscape underneath was always in level with the fence.
![PCG tools overview](/projects/we-resist/pcg.png)

<video src="/projects/we-resist/fencevideo.mp4" controls muted loop playsinline></video>

![Wooden fence PCG graph](/projects/we-resist/fencegraph.png)

The electric poles system required a more complex approach and consisted of a mix of blueprint logic and Unreal's PCG system. The goal was to create several main lines with sub-branches that would connect directly to houses. For the cable attachments I used Unreal's cable component and found appropriate connections using sphere traces, triggered by the construction script.
<video
  src="/projects/we-resist/polesvideo.mp4"
  title="Procedural electric pole framework"  controls  muted  loop playsinline></video>
![Sub-branch electric pole logic](/projects/we-resist/branchpolebp.png)
## Shaders 

Since the project leveraged mostly hand-painted textures, the required shader work was minimal. Nontheless my work consisted of setting up a paintable landscape material & creating a plaster normal shader, simulating the rough plaster used in our historical period. I also created a tint randomization functionality for the houses increasing their visual variation and speeding up the pace of development.
![House tint variation](/projects/we-resist/housevariation.png)
![Plaster normal shader](/projects/we-resist/plastershader.png)
