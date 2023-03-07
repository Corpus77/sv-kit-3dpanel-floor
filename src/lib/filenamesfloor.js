const filenamesPuzzles = [
  { url: "f-grass.jpg", size: 70, title: "Трава" },
  { url: "f-water.webp", size: 70, title: "Вода" },
  { url: "f-brownwood.webp", size: 70, title: "Коричневое дерево" },
  { url: "f-darkgreywood.webp", size: 70, title: "Темно-серое дерево" },
  { url: "f-darkwood.webp", size: 70, title: "Темное дерево" },
  { url: "f-goldenwood.webp", size: 70, title: "Золотое дерево" },
  { url: "f-greywood.webp", size: 70, title: "Серое дерево" },
  { url: "f-lightrosewood.webp", size: 70, title: "Светло-розовое дерево" },
  { url: "f-persikwood.webp", size: 70, title: "Персиковое дерево" },
  { url: "f-redwood.webp", size: 70, title: "Красное дерево" },
  { url: "f-rosewood.webp", size: 70, title: "Розовое дерево" },
  { url: "f-sandywood.webp", size: 70, title: "Песочное дерево" },
  { url: "f-yantarwood.webp", size: 70, title: "Янтарное дерево" },
  { url: "f-yellowwood.webp", size: 70, title: "Желтое дерево" },
  { url: "f-holes.webp", size: 70, title: "Отверстия" },
];
const filenamesPuzzlesButton = [
  { url: "brownwood.webp", size: 70, title: "Коричневое дерево" },
  { url: "darkgreywood.webp", size: 70, title: "Темно-серое дерево" },
  { url: "darkwood.webp", size: 70, title: "Темное дерево" },
  { url: "goldenwood.webp", size: 70, title: "Золотое дерево" },
  { url: "grass.webp", size: 70, title: "Трава" },
  { url: "greywood.webp", size: 70, title: "Серое дерево" },
  { url: "holes.webp", size: 70, title: "Отверстия" },
  { url: "lightrosewood.webp", size: 70, title: "Светло-розовое дерево" },
  { url: "persikwood.webp", size: 70, title: "Персиковое дерево" },
  { url: "redwood.webp", size: 70, title: "Красное дерево" },
  { url: "rosewood.webp", size: 70, title: "Розовое дерево" },
  { url: "sandywood.webp", size: 70, title: "Песочное дерево" },
  { url: "water.webp", size: 70, title: "Вода" },
  { url: "yantarwood.webp", size: 70, title: "Янтарное дерево" },
  { url: "yellowwood", size: 70, title: "Желтое дерево" },
];
const filenamesVinil = [
  { url: "bejmramor.webp", size: "600x300", title: "Бежевый мрамор" },
  { url: "blackmramor.webp", size: "600x300", title: "Черный мрамор мат." },
  { url: "blackmramorlux.webp", size: "600x300", title: "Черный мрамор гл." },
  { url: "colormramor.webp", size: "600x300", title: "Цветной мрамор" },
  { url: "darkmramor.webp", size: "600x300", title: "Темный мрамор" },
  { url: "greylux.webp", size: "600x300", title: "Серый мрамор гл." },
  { url: "naturalmramor.webp", size: "600x300", title: "Натуральный мрамор" },
  { url: "lightstonemramor.webp", size: "600x300", title: "Светлый камень" },
  { url: "whitemramor.webp", size: "600x300", title: "Белый мрамор" },
  { url: "stonemramor.webp", size: "600x300", title: "Каменный мрамор" },
  { url: "redmramor.webp", size: "600x300", title: "Красный мрамор" },
  { url: "mramor.webp", size: "600x300", title: "Мрамор" },
  { url: "lightmramor.webp", size: "600x300", title: "Светлый мрамор" },
  {
    url: "lightgreymramor.webp",
    size: "600x300",
    title: "Светло-серый мрамор",
  },
  {
    url: "naturalmramor2.webp",
    size: "600x300",
    title: "Натуральный мрамор-2",
  },
  {
    url: "silvermramorlux.webp",
    size: "600x300",
    title: "Серебряный мрамор гл.",
  },
  {
    url: "silvermramor.webp",
    size: "600x300",
    title: "Серебряный мрамор мат.",
  },

  { url: "darkwood.webp", size: "914x152", title: "Темное дерево" },
  { url: "ashwood.webp", size: "914x152", title: "Пепельное дерево" },
  { url: "greywood.webp", size: "914x152", title: "Серое дерево" },
  { url: "kashtanwood.webp", size: "914x152", title: "Каштановое дерево" },
  { url: "milkwood2.webp", size: "914x152", title: "Молочное дерево-2" },
  { url: "oldwood.webp", size: "914x152", title: "Старое дерево" },
  { url: "venge.webp", size: "914x152", title: "Венж" },
  { url: "wildpear.webp", size: "914x152", title: "Дикая груша" },
  { url: "milkwood.webp", size: "914x152", title: "Молочное дерево" },
  { url: "mosaicwood.webp", size: "914x152", title: "Мозаика дерево" },

  {
    url: "mosaicdarkwood.webp",
    size: "914x152",
    title: "Темная мозаика дерево",
  },
  {
    url: "greystripeswood.webp",
    size: "914x152",
    title: "Серое полосатое дерево",
  },
  {
		url: 'brick1.jpg',
		size: '300x300',
		title: 'Кирпич 1'
	},
	{
		url: 'brick2.jpg',
		size: '300x300',
		title: 'Кирпич 2'
	},
	{
		url: 'brick3.jpg',
		size: '300x300',
		title: 'Кирпич 3'
	},
	{
		url: 'brick4.jpg',
		size: '300x300',
		title: 'Шестиугольники'
	},
	{
		url: 'brick5.jpg',
		size: '300x300',
		title: 'Керамика'
	},
	{
		url: 'brick6.jpg',
		size: '300x300',
		title: 'Кирпич 6'
	},
	{
		url: 'brick7.jpg',
		size: '300x300',
		title: 'Кирпич 7'
	},
	{
		url: 'brick8.jpg',
		size: '300x300',
		title: 'Кирпич 8'
	},
	{
		url: 'brick9.jpg',
		size: '300x300',
		title: 'Кирпич 9'
	},
	{
		url: 'brick10.jpg',
		size: '300x300',
		title: 'Кирпич 10'
	},
	{
		url: 'orn1.jpg',
		size: '300x300',
		title: 'Орнамент 2'
	},
	{
		url: 'orn2.jpg',
		size: '300x300',
		title: 'Орнамент 2'
	},
	{
		url: 'orn3.jpg',
		size: '300x300',
		title: 'Орнамент 3'
	},
	{
		url: 'orn4.jpg',
		size: '300x300',
		title: 'Орнамент 4'
	},
	{
		url: 'orn5.jpg',
		size: '300x300',
		title: 'Орнамент 5'
	},
	{
		url: 'orn6.jpg',
		size: '300x300',
		title: 'Орнамент 6'
	},
	{
		url: 'orn7.jpg',
		size: '300x300',
		title: 'Орнамент 7'
	},
	{
		url: 'orn8.jpg',
		size: '300x300',
		title: 'Орнамент 8'
	},
	{
		url: 'orn9.jpg',
		size: '300x300',
		title: 'Орнамент 9'
	},
	{
		url: 'orn10.jpg',
		size: '300x300',
		title: 'Орнамент 10'
	},
	{
		url: 'orn11.jpg',
		size: '300x300',
		title: 'Орнамент 11'
	},
	{
		url: 'orn13.jpg',
		size: '300x300',
		title: 'Орнамент 13'
	},
	{
		url: 'orn14.jpg',
		size: '300x300',
		title: 'Орнамент 14'
	},
];
export { filenamesPuzzles, filenamesVinil, filenamesPuzzlesButton };
