# Substantial changes to the codebase

We added a Character type which can be one of the following: misa-blond-hair, misa-red-hair, misa-green-hair, or misa-blue-hair. Each Character type is associated with a specified sprite. These new sprites can be located in public/assets/characters/characterType.png. Each of these png images must have a sprite facing multiple ways in order for the animation to run smoothly. If new sprites want to be added, they must be added here and also loaded into WorldMap.tsx (see line #352 to see how each sprite is currently loaded onto a town for a user).

We changed the Player class, so it now has a Character type attribute. This allows a Player to now have a specified sprite that will be loaded onto the UI of a town. This information is handled the same way a user specifies their ingame username, and as such this change propogated throughout a few classes that reference the player.

We added new react elements to TownSelection to handle updating the character field of the player through user interaction. Menu elements are exclusive selection where one element must always be selected, and also correspond to a visual preview. Additionally, we added a randomizer react element to TownSelection that randomly selects one of the four appearances to set to.

# Architecture of New Code

The following files were changed in some capacity and are referenced in the updated UML diagram below:

frontend/src/App.tsx
frontend/src/classes/Player.ts
frontend/src/classes/TownsServiceClient.ts
frontend/src/classes/Video/Video.ts
frontend/src/components/Login/TownSelection.tsx
frontend/src/components/world/WorldMap.tsx
services/roomService/src/client/TownsServiceClient.ts

![Architecture](https://prnt.sc/11ewcuj)
