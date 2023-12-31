import SceneView from "@arcgis/core/views/SceneView.js";
import Map from "@arcgis/core/Map.js";
import Mesh from "@arcgis/core/geometry/Mesh.js";
import Graphic from "@arcgis/core/Graphic.js";

const map = new Map({
	basemap: "satellite",
	ground: "world-elevation",
});

const view = new SceneView({
	container: "viewDiv",
	map: map,
	camera: {
		position: [19.93538, 50.04638, 900],
		heading: 0,
		tilt: 50,
	},
	qualityProfile: "high",
});

let rect = new Mesh({
	vertexAttributes: {
		// prettier-ignore
		position: [
			19.93455, 50.05371, 230,
			19.93455, 50.05401, 230,
			19.93534, 50.05371, 230,
			19.93534, 50.05401, 230,
			19.93455, 50.05371, 250,
			19.93455, 50.05401, 250,
			19.93534, 50.05371, 250,
			19.93534, 50.05401, 250,
		],
	},

	// ! Wskazówka, każda powierzchnia jest trójkątna
	components: [
		{
			// prettier-ignore
			faces: [
        0, 1, 2,
        2, 1, 3,
        0, 1, 4,
        5, 4, 1,
        0, 2, 6,
        6, 4, 0,
        6, 7, 2,
        7, 3, 2,
        7, 3, 1,
        1, 5, 7,
        5, 4, 6,
        5, 7, 6
        ],
		},
	],
});

let graphic = new Graphic({
	geometry: rect,
	symbol: {
		type: "mesh-3d",
		symbolLayers: [{ type: "fill" }],
	},
});

view.graphics.add(graphic);

function waitForElm(selector) {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver((mutations) => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

waitForElm(".esri-ui.calcite-mode-light").then(() => {
	document.querySelector(".esri-ui.calcite-mode-light").remove();
});
