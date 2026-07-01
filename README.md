# museum-totem-art-zoom
A totem meant for museums and schools, bringing art and science together and exposing the connection between the world we see and the models used in molecular science.



**Overview:**
The software is a "touchless" interactive application that integrates computer vision for gesture recognition and web rendering for 3D model visualization.

**1. Interaction and Computer Vision Module**

* The system must capture the video stream from the camera to track the user's hands in real time.


* It must map the 2D spatial coordinates of the hand with low latency.


* The main technology for tracking must be the **MediaPipe Hands** library.


* The interaction logic is based on the detection of the "pinch" gesture, calculated by the distance between the thumb and index finger.


* This pinch gesture will act as the main "click" or "trigger" for all interactions within the software.



**2. Navigation Architecture (3 Levels)**
The software features a modular navigation system divided into three sequential layers:

* 
**Level 1 - Painting (Artwork):** The application starts by displaying a full-screen artwork. In this layer, the pinch gesture is also used to select specific areas of the painting (pigments) or the artist's signature.


* 
**Level 2 - Material (Context):** Upon selecting a point in Level 1, the application transitions to display historical and cultural information about the selected material, including its name, origin, production, and historical use. Chemistry is intentionally kept to a minimum in this layer.


* 
**Level 3 - Molecule (3D Visualization):** After zooming in, the system displays the material name, molecular model, and chemical information corresponding to the pigment. In this layer, the pinch gesture assumes also a "grab" function, allowing the user to freely rotate the 3D object in space.



**3. Selection Logic (Mapping via Masks)**

* Detecting which element the user selected on the painting is done using a hidden "mask" image (not visible to the user).


* The mask contains simplified versions of the artwork where each region of interest is filled with a specific solid color.


* When the user performs the selection gesture on the main image, the system must query the exact (X, Y) coordinates on the hidden mask.


* The system extracts the RGB value of that pixel from the mask and uses it as a "key" in a database to fetch the information corresponding to that region.



**4. 3D Rendering Module**

* Three-dimensional display and manipulation must use **WebGL**.


* For the dynamic loading of atomic structures, the **3D MOL** library must be used.


* The 3D model files will be in the `.MOL` format.



**5. Current Project Context & Architecture Needs**

* **Current Files:** There is a color mask named `color_angel` and the original painting named `visible_angel`.
* **Codebase State:** The current code is entirely contained within a single HTML file.
* **Development Focus:** One of the areas that needs architectural planning and development is how to properly organize all the quimical components and their data for better maintainability and scale.