---
title: Batch Editing Unreal Plugin
slug: batch-edit-plugin
category: Technical Art
description: Plugin for Unreal Engine 5.6 that provides functionality to work with large number of assets, speeding up common tasks.
thumbnail: /projects/batch-edit-plugin/batch-edit-hero.png
heroImage: /projects/batch-edit-plugin/batch-edit-hero.png
tools:
  - Unreal Engine 5
  - Python
featured: true
order: 4
---

## Overview

This plugin is an Unreal Engine 5.6 editor utility tool for batch-editing, profiling and setting up assets. Created based on my own frustration from going over tens of assets in larger projects and changing one setting at a time, the goal of this plugin was to create a framework for working with multiple assets at once, simplifying and automating mundane repetitive tasks.

The plugin uses a combination of Blueprint and Python functionality and is built as an Editor Utility Widget, directly accessible in the UE editor. You can find out more abut the implementation in the last section. Public release is planned after further testing will be conducted.

Supported Features:

1. - Asset property Editing
	
2. - Automatic material instance creation

3. - Automatic material assignment

4. - Asset Validation & Settings Overview

5. - LOD / Collision generation

## Asset Property Editing

The property editing tool allows to batch edit asset properties of a specified class and currently supports boolean, integer, float and enum property types. It first lets you select a class type based on classes available in your current content browser and subfolders. After you specify the property you want to change it displays a list of assets of the selected class with the option to edit them all at once or individually. The list indicates if a property has been changed and lets you open individual assets as well.

<video src="/projects/batch-edit-plugin/batch-property-edit-video.mp4" controls muted loop playsinline></video>

## Material Instance Creation & Assignment

With the utilization of a naming convention these tools let you create & assign Material Instances in a few clicks and work for both Static and Skeletal Meshes. 

The Material Instance creation requires setting up a parent material with Texture Samples as parameters. The tool maps texture groups and then creates Material Instances with their assigned textures.  
  The Material Assignment tool maps the slot names of the selected mesh and tries to find appropriate Material Instances in the current folder.

The project uses this naming convention:  
  StaticMesh: SM_MeshID (SM_Drone)
  Texture: MeshID_SlotName_Type (Drone_Hull_Normal)
  Material Instance: MI_MeshID_SlotName (MI_Drone_Hull)

<video src="/projects/batch-edit-plugin/materials.mp4" controls muted loop playsinline></video>

## Asset Validation & Settings Overview

This functionality lets you check common settings and properties for Static Meshes and Materials, providing a clean pathway to viewing both performance and functional properties. Static mesh overview supports collision, LOD, vertex count and Nanite setting check. Material overview sumarizes main Material settings into one list.

![](/projects/batch-edit-plugin/profiling.png)

## Collision Generation & Edit

This tool enables you to generate Shape-based or Convex collision for selected Static Meshes. For both you can choose parameters and also set Collision Complexity and Collision Enabled parameters. The Shape-based collision supports Unreal's default collision shapes. It also enables you to delete current Simple collision to make the whole process iterable.

![](/projects/batch-edit-plugin/collisions.png)

## LOD Generation
This tool generates LODs for selected Static Meshes and provides modular UI to accommodate user-selected number of LODs. It provides control of PercentTriangles and ScreenSize for individual LODs as well as setting their LOD group.

![](/projects/batch-edit-plugin/lods.png)

## Technical Implementation
The plugin is built as a Editor Utility Widget framework with focus on the UI's modularity and flexibility. It combines the use of Blueprints and Python while leveraging JSON-based data parsing for efficient data transfer.

Some tools like the Batch Property Editing use multiple Python scripts, while some like LOD generation use Blueprints only. The pipeline varies for each tool but a common approach is:

![](/projects/batch-edit-plugin/pipeline-graph.png)

The plugin uses Unreal Engine’s Editor Utility Library, Asset Registry, and Static Mesh Editor Subsystem to access and modify editor-side asset data.  

For collision tools, selected Static Meshes are accessed through their `body_setup` data, which exposes the collision configuration used by the mesh. This allows the tool to inspect and update collision settings, remove existing simple collision, and generate new collision setups through the editor workflow. The code below shows the implementation of collision settings editing tool.

![Implementation of collision settings](/projects/batch-edit-plugin/collision-code.png)


