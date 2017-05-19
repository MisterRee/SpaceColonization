# SpaceColonization

#### --Loud Volume Warning--
[Demo](https://people.rit.edu/dxl1720/ComputationalAesthetics/SpaceColony/)

A basic representation of a programatically generated tree which sways to an audio sample of wind. The direction of the branches determined by a [Vector Field](https://en.wikipedia.org/wiki/Vector_field) randomly generated using perlin noise. To further emphasize the existance of this vector field which is not directly displayed, randomly spawning "flows" will travel using the vector fields. These flows were meant to represent falling leaves in the aesthetic sense of the project.

The tree is generated using the [Space Colonization Algorithm](http://algorithmicbotany.org/papers/colonization.egwnp2007.large.pdf), which generates "leaves" across the accessible surface area before the algorithm begins. The algorithm then will detect the closest leaf within a set minimum and maximum distance domain, and will use the leaf's position as a vector force applied to a previous iteration's direction vector to generate the next "branch of the tree. With each successful leaf detected iteration, the respective leaf is removed so that the algorithm will eventually end.

The tree begins in the center of the canvas screen, with a randomly generated direction.

The swaying affect is achieved by detected the volumne of the audio being played, which is detected through the web audio api. The amplitude of the audio is used as an active variable to apply the magnitude of the direction of the vector field to each respective branch of the tree.

#### Controls
The only controls is the space bar, which will reseed generative variables.

### References / Inspirations

[Space Colonization Reference](https://www.youtube.com/watch?v=kKT0v3qhIQY)

[Audio Analysis Reference](http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound)

[Wind Sample Used](https://www.freesound.org/people/acclivity/sounds/22818/)

[Perlin Noise](https://www.npmjs.com/package/perlin-noise)
