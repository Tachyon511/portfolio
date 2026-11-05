---
title: Medieval Modular Architecture Kit
slug: medieval-kit
category: Environment Design
description: Modular architectural asset kit for game development with procedural and hand-painted shaders. Optimized for real-time use in Unreal Engine 5.
thumbnail: /projects/medieval-kit/hero.png
heroImage: /projects/medieval-kit/hero.png
tools:
  - Unreal Engine 5
  - Blender
order: 1
tags:
  - 3D_Modelling
  - Shaders
---
:::split
## Overview
The goal of this project was gain better experience on how modular kits work and how to implement them properly in Unreal Engine 5. The project uses exclusively tiled materials with the addition of hand-painted and dynamic shaders.

The kit is inspired by medieval english architecture and combines Gothic and Romanesque elements with sturdy and fortified aesthetic into one cohesive system suitable for both religious or civic environments.
:::next
![](/projects/medieval-kit/references.png)
:::end
![](/projects/medieval-kit/render02.png)
:::split
## Modularity
The kit uses 3x3m as a base grid size with additional 1.5m and 0.75m elements. This provides a good mix of flexibility and scaleability for bigger structures. 

The kit also includes modules suitable for interior environments with 1m depth, like window and doorway modules. The interior is further supported by arch-corridor modules that are compatible with the rest of the elements and the grid layout.
:::next
![](/projects/medieval-kit/asset_showcase.png)
:::end
:::split
![](/projects/medieval-kit/modulardemo.png)
:::next
![](/projects/medieval-kit/modularcorridor.png)
:::end
<video src="/projects/medieval-kit/cortest.mp4" controls muted loop playsinline></video>
:::split
## Material Workflow
Since the project uses only tileable textures the main focus of the material workflow was on:
- Precise UV Unwrapping
- Tiling break-up with Masks
- Scaleable Material Instance Structure

Using tileable materials eliminated the need for unique baked texture sets for individual assets, enabling faster iteration and consistent material reuse throughout the kit
:::next
![](/projects/medieval-kit/render04.png)
:::end
![](/projects/medieval-kit/shadershowcase.png)
:::split
## Dynamic Dirt Mask
With the use of Distance Field Approximate AO I was able to create a dynamic dirt mask. This method creates gradients from intersecting geometry and cavities from the Distance Field layer in Unreal. 

Although this approach does not provide the same level of detail as baked AO and edge masks, its flexibility and lower texture memory overhead make it a practical alternative, especially for modular kits with intersecting geometry
:::next
![](/projects/medieval-kit/dfaomask.png)
:::end
<video src="/projects/medieval-kit/dfaodemo.mp4" controls muted loop playsinline></video>
:::split
![DistanceFieldApproxAO Material Function](/projects/medieval-kit/dfaoshader.png)
:::next
![Material Function setup with controls](/projects/medieval-kit/dfaosetup.png)
:::end
:::split
## Painted Wear
The second layer of detail utilizes Unreal Engine's Texture Colour Painting functionality, allowing individual texture masks to be painted directly onto instanced meshes. A key advantage of this approach is its compatibility with Nanite, unlike traditional Vertex Colour painting.

Although this introduces additional Texture Memory overhead, the use of virtual textures keeps memory requirements manageable. Since the painted texture masks only control material transitions, relatively low resolution textures were sufficient:
- 256x256 For smaller meshes
- 512x512 For bigger meshes
:::next
## HeightLerp and POM
Texture Colour Painting was used in combination with HeightLerp, which enabled the painted texture to be masked by the Height Map of the Base Material, following it's details and cavities.

The shader setup also included Parallax Occlusion Mapping, with the depth being directly controlled by the gradient value of the painted mask, creating smooth transitions and minimizing POM artifacts, even from relatively sharp angles.
:::end
<video src="/projects/medieval-kit/pomdemo.mp4" controls muted loop playsinline></video>
![](/projects/medieval-kit/pomdetail.png)
:::split
![Mask POM Setup](/projects/medieval-kit/pompaint.png)
:::next
![Texture Color Paint Setup](/projects/medieval-kit/texturecolor.png)
:::end