(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.controller = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var menu = document.getElementById('menu');
var a = document.getElementsByTagName('a');
var langButton = document.querySelector('#language a');
var container = document.getElementById('image');

var categories = {
	drawings: {
			count: 31,
			category: 'drawings',
			categorie: 'dessins',
			EN: 'pencil and graphite on synthetic paper',
			EN2: 'graphite powder and pencil on synthetic paper 63" x 47',
			FR: 'crayon et graphite sur papier synthétique',
			FR2: 'poudre de graphite et crayon sur papier synthétique 160 x 119 cm',
			titles: ['SPRN / Vide et raison d’être', 'SHLL / Vide et raison d’être', 'AMHR / Vide et raison d’être', 'CPSL2 / Vide et raison d’être', 'CPSLA / Vide et raison d’être', 'FNNL I / Vide et raison d’être', 'FNNL II / Vide et raison d’être', 'VSSL / Vide et raison d’être', 'Lost and Found', 'Jointures', 'Propulsion #1', 'Slingshot', 'Propulsion # 2', 'Cône de déjection', 'Créature sur tiges', 'Instrument', 'Outil', 'Labourage # 1', 'Labourage # 2', 'Labourage # 3', 'En formation', 'Extention', 'Légéreté de l’être', 'Éternel changement', 'Rayons obliques', 'Matière première #2', 'Tissage # 2','Sans titre', 'Field X', 'Regénération', 'Paysage changeant', 'Perpétuité', 'Matière première #1']
			},
	etchings: {
			count: 10,
			category: 'etchings',
			categorie: 'gravures',
			EN: 'photopolymer etchings and chine-collé on arches',
			FR: 'gravure photopolymère et chine-collé sur arches',
			titles: ['Lac blanc', 'Colonne', 'V-Vase #1', 'Herbe', 'In-Vase', 'Respiration # 1', 'Respiration # 2', 'Respiration # 4', 'Respiration # 5', 'Respiration # 6']
			},
	monotypes: {
			count: 13,
			category: 'monotypes',
			categorie: 'monotypes',
			EN: 'water based monotypes on arches',
			FR: 'monotypes à base d’eau sur arches',
			titles: ['In transition L', 'Elemental earth worl I', 'Reservoir S', 'Passage M', 'Sheltering secrets', 'Elemental Earth work C', 'Jeux de sable I', 'Jeux de sable Z', 'Passage Z', 'Reservoir # 1', 'Reservoir # 2', 'Reservoir A', 'Sans titre K']
			},
	paintings: {
			count: 16,
			category: 'paintings',
			categorie: 'peintures',
			EN: 'oil on wood pannel',
			FR: 'huile sur panneau de bois',
			titles: ['Sans titre L', 'Sans titre N', 'Traverses # 1', 'Traverses # 2', 'Traverses # 3', 'Traverses # 4', 'Traverses # 5', 'Traverses # 6', 'Traverses # 7', 'Traverses # 8', 'Traverses # 9', 'Traverses # 10', 'Traverses # 11', 'Traverses # 12', 'Traverses # 13', 'Traverses # 14']
			},
	photography: {
			count: 15,
			category: 'photography',
			categorie: 'photographie',
			EN: 'Play is oxigen for creation.',
			FR: 'Le jeu est l’oxigène de la créativité.',
			titles: ['Autorespiration # 1', 'Autorespiration # 2', 'Autorespiration # 3', 'Autorespiration # 4', 'Autorespiration # 5', 'Autorespiration # 6', 'Autorespiration # 7', 'Autorespiration # 8', 'Autorespiration # 9', 'Autorespiration # 10', 'Autorespiration # 11', 'Autorespiration # 12', 'Autorespiration # 13', 'Autorespiration # 14', 'Autorespiration # 15']
			},
	models: {
			count:21,
			category: '3d models',
			categorie: 'modèles 3d',
			EN: 'These 3D structures, found objects, and sculptures in most cases were built as research and inspirational models for large scale drawings, a reverse approach to the traditional method, when the media of drawing was an essential study tool for the creation of large sculptures.',
			FR: 'Ces formes 3D, objets trouvés et sculptures ont été construites, dans la plupart des cas, comme moyens de recherche et d’inspiration pour mes dessins de large format. Cette approche est opposée à l’approche traditionnelle, où le dessin est l’étape préparatoire à un plus large projet, telle une sculpture.',
			titles: ['Brace', 'Cage unit Z2', 'Cage unit Z3','Cage unit Z4', 'Cage unit Z8', 'Cage unit Z9', 'Luminaires', 'Cage unit Z1', 'Cage unit Z14', 'Cage unit Z22', 'Cage unit Z13', 'Cage unit Z19', 'Unité noire', 'Élément mobile', 'Site', 'Élément monile B', 'Cage unit Z11', 'Cage unit Z22', 'Cage unit Z7', 'Lignt tower', 'Spider copy']
			},
	biography:{
			count: 0,
			category: 'biography',
			categorie: 'biographie',
			FR: 'Vladimir Zabeida est né à Lviv, en Ukraine, en 1956. En 1991, quand l’Union Soviétique était sur le point de s’effondrer, Zabeida a quitté les incertitudes politiques de son pays d’origine et s’est établi au Canada. Sa formation multidisciplinaire en art du Collège d’Arts Appliqués de Lviv, Ukraine (1977-1975) et de l’Académie des Arts de Lviv, Ukraine, (1977-1982) a été instrumentale dans son développement artistique. Pendant plusieurs années, Zabeida a travaillé à l’Atelier Circulaire à Montréal. Se concentrant majoritairement dans la gravure photopolymère et le dessin. Il a aussi conduit des ateliers et séminaires d’estampe. De 2003 à 2004, Vladimir Zabeida a enseigné à l’Université Queens à Kingston, Ontario. Il a aussi maintenu simultanément sa pratique dans son studio à Montréal. Au cours des dernières années, Zabeida a surtout concentre son attention sur sa nouvelle série de travaux, composée de dessins à grande échelle ainsi que de peintures. Il est le récipiendaire de plusieurs prix et reconnaissances, parmis lesquelles: Bourse de recherche et création, Type A, Conseil des arts et des lettres du Québec, (2007); First Prize- “Evolution”, North American Juried Exhibition, Windsor, Canada (2004); Pollock-Krasner Award, New York, NY , USA (2003); First Place, The 8th Great Canadian Printmaking Competition, Toronto, Canada (2002). Les travaux de Vladimir Zabeida ont été exposés internationalement et sont inclus dans plusieurs collections privées et publiques en Amérique du Nord, Europe et Asie: Ernst & Young, Toronto, Canada LOTO- Québec, Montréal, Canada Guang Dong Museum of Art, Guangzhou, China Fidelity Investments, Boston, USA Liu Hai Su Art Museum, Shanghai, China National Bank of Canada, Montréal, Canada Le Cirque du Soleil, Montréal, Canada; Rio Tinto Alcan Canada, Montréal, Canada Meditech Circle, Westwood, MA, USA Bibliotheque Nationale du Québec, Montréal, Canada',
			EN: 'Vladimir Zabeida was born in Lviv, Ukraine in 1956. In 1991, when the Soviet Union was on the verge of collapse, he left the political uncertainties of his homeland and settled in Canada. His multidisciplinary training in art from the Lviv College of Applied Arts, Ukraine (1971-75) and the Lviv Academy of Arts, Ukraine (1977-82) has been instrumental in his artistic development. For many years Zabeida worked at Atelier Circulaire in Montreal, predominantly concentrating in the field of photopolymer gravure and drawings. He has also conducted printmaking workshops and seminars. In 2003 – 2004 Vladimir Zabeida taught at the Queen’s University in Kingston, Ontario, while maintaining a studio practice in Montreal. In the past few years Zabeida focused his attention on a new body of work, comprised of large scale drawings and paintings. He is the recipient of many grants and awards, among which are: Artistic Research and Creation Grant,Type A,Conseil des arts et des lettres du Québec (2007) First Prize- “Evolution”, North American Juried Exhibition, Windsor, Canada (2004) Pollock-Krasner Award, New York, NY,USA (2003) First Place, The 8th Great Canadian Printmaking Competition, Toronto, Canada (2002) Vladimir Zabeida’s work have been exhibited internationally and are included in many private and public collections throughout North America, Europe and Asia including: Ernst & Young, Toronto, Canada, Guang Dong Museum of Art, Guangzhou, China Fidelity Investments, Boston, USA Liu Hai Su Art Museum, Shanghai, China LOTO- Québec, Montreal, Canada National Bank of Canada, Montreal, Canada Le Cirque du Soleil, Montreal, Canada Rio Tinto Alcan Canada, Montreal, Canada Meditech Circle, Westwood, MA, USA Bibliotheque Nationale du Québec,Montreal,Canada',
			titles: []
	}
};

var model = {
	language: ''
}

var controller = {
	init: function(){
		view.init();
	},
	setInitialLanguage: function(language){
		model.language = language;
	},
	getLanguage: function(){
		return model.language;
	},
	changeLanguage: function(targetLanguage){
		model.language = targetLanguage;
		view.render();
	}
}

var view = {
	init: function(){
		function preloadImages(){
			for(var prop in categories){
				if (categories.hasOwnProperty(prop)) {
					for(var y = 1; y<=categories[prop].count; y++){
						var picture = document.createElement('img');
						picture.src = '/images/'+prop+'/'+y+'.jpg';
					}
				}
			}
		};
		preloadImages();

		langButton.addEventListener('click', function(e){
			var language = e.target.innerHTML;

			controller.changeLanguage(language);
		});

		menu.addEventListener('click', function(e) {
			console.log(container.scrollTop);
			container.scrollTop = 0;
			var category = e.target.id;
			update(category);
		});

		function update(category){
			while(document.images.length){
				container.removeChild(document.images[0]);
			};

			if(category!=='biography'){
				for(var y = 1; y<=categories[category].count; y++){
					var picture = document.createElement('img');
					picture.src = '/images/'+category+'/'+y+'.jpg';
					container.appendChild(picture);
				}
			};
		};

		controller.setInitialLanguage('en');
		this.render();
	},
	clean: function(){
		for(var x = 0; x<document.getElementsByTagName('a').length; x++){
			document.getElementsByTagName('a')[x].innerHTML = '';
		}
	},
	render: function(){
		this.clean();

		var language = controller.getLanguage();

		if(language === 'en'){
			langButton.appendChild(document.createTextNode('fr'));
			for(var prop in categories){
				if (categories.hasOwnProperty(prop)) {
					var textNode = document.createTextNode(categories[prop].category);
					var index = Object.keys(categories).indexOf(prop);
					a[index+1].appendChild(textNode);
				}
			}
		}else if(language==='fr'){
			langButton.appendChild(document.createTextNode('en'));
			for(var prop in categories){
				if (categories.hasOwnProperty(prop)) {
					var textNode = document.createTextNode(categories[prop].categorie);
					var index = Object.keys(categories).indexOf(prop);
					a[index+1].appendChild(textNode);
				}
			}
		};
	}
}

controller.init();


},{}]},{},[1])(1)
});