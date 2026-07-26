const products = [

{
id:1,
name:"Potato",
tigrinya:"ድንሽ",
category:"food",
image:"images/potato.jpg",
brand:"Fresh",
options:[
{unit:"1 kg",price:50},
{unit:"2 kg",price:100},
{unit:"5 kg",price:250}
]
},

{
id:2,
name:"Tomato",
tigrinya:"ቲማቲም",
category:"food",
image:"images/tomato.jpg",
brand:"Fresh",
options:[
{unit:"1 kg",price:80},
{unit:"2 kg",price:160},
{unit:"5 kg",price:400}
]
},

{
id:3,
name:"Cooking Oil",
tigrinya:"ዘይቲ",
category:"food",
image:"images/oil.jpg",
brand:"Nile Oil",
options:[
{unit:"1 Liter",price:350},
{unit:"5 Liter",price:700}
]
},

{
id:4,
name:"Baby Milk",
tigrinya:"ጸባ ህጻን",
category:"baby",
image:"images/baby.jpg",
brand:"Brand A",
options:[
{unit:"Pack",price:250},
{unit:"Large Pack",price:300}
]
},

{
id:5,
name:"Soap",
tigrinya:"ሳሙና",
category:"home",
image:"images/soap.jpg",
brand:"Lux",
options:[
{unit:"Piece",price:40},
{unit:"Pack",price:60}
]
},


{
id:6,
name:"Onion",
tigrinya:"ሽጉርቲ",
category:"food",
image:"images/onion.jpg",
brand:"Fresh",
options:[
{unit:"1 kg",price:60},
{unit:"2 kg",price:120},
{unit:"5 kg",price:300}
]
},

{
id:7,
name:"Carrot",
tigrinya:"ካሮት",
category:"food",
image:"images/carrot.jpg",
brand:"Fresh",
options:[
{unit:"1 kg",price:70},
{unit:"2 kg",price:140}
]
},

{
id:8,
name:"Banana",
tigrinya:"ባናና",
category:"food",
image:"images/banana.jpg",
brand:"Fresh",
options:[
{unit:"1 kg",price:50},
{unit:"2 kg",price:100}
]
},

{
id:9,
name:"Apple",
tigrinya:"ቱፋሕ",
category:"food",
image:"images/apple.jpg",
brand:"Imported",
options:[
{unit:"1 kg",price:120},
{unit:"2 kg",price:240}
]
},

{
id:10,
name:"Orange",
tigrinya:"ብርቱካን",
category:"food",
image:"images/orange.jpg",
brand:"Fresh",
options:[
{unit:"1 kg",price:80},
{unit:"2 kg",price:160}
]
},
{
id:11,
name:"Sugar",
tigrinya:"ሽኮር",
category:"food",
image:"images/sugar.jpg",
brand:"Walia",
options:[
{unit:"1 kg",price:80},
{unit:"5 kg",price:400}
]
},

{
id:12,
name:"Flour",
tigrinya:"ሓርጭ",
category:"food",
image:"images/flour.jpg",
brand:"Local",
options:[
{unit:"1 kg",price:60},
{unit:"5 kg",price:300}
]
},

{
id:13,
name:"Rice",
tigrinya:"ሩዝ",
category:"food",
image:"images/rice.jpg",
brand:"Abay",
options:[
{unit:"1 kg",price:90},
{unit:"5 kg",price:450}
]
},

{
id:14,
name:"Pasta",
tigrinya:"ፓስታ",
category:"food",
image:"images/pasta.jpg",
brand:"Family",
options:[
{unit:"500 g",price:50},
{unit:"1 kg",price:100}
]
},

{
id:15,
name:"Biscuit",
tigrinya:"ቢስኩት",
category:"food",
image:"images/biscuit.jpg",
brand:"Various",
options:[
{unit:"Pack",price:30},
{unit:"Large Pack",price:60}
]
},
{
id:16,
name:"Baby Diapers",
tigrinya:"ዳይፐር ህጻን",
category:"baby",
image:"images/diaper.jpg",
brand:"Pampers",
options:[
{unit:"Small Pack",price:250},
{unit:"Large Pack",price:450}
]
},

{
id:17,
name:"Baby Soap",
tigrinya:"ሳሙና ህጻን",
category:"baby",
image:"images/baby-soap.jpg",
brand:"Johnson",
options:[
{unit:"Piece",price:80},
{unit:"Pack",price:150}
]
},

{
id:18,
name:"Baby Lotion",
tigrinya:"ክሬም ህጻን",
category:"baby",
image:"images/lotion.jpg",
brand:"Johnson",
options:[
{unit:"Small",price:120},
{unit:"Large",price:220}
]
},
{
id:19,
name:"Laundry Detergent",
tigrinya:"ሳሙና ልብሲ",
category:"home",
image:"images/detergent.jpg",
brand:"Omo",
options:[
{unit:"500 g",price:80},
{unit:"1 kg",price:150}
]
},

{
id:20,
name:"Washing Powder",
tigrinya:"ፓውደር",
category:"home",
image:"images/powder.jpg",
brand:"Bama",
options:[
{unit:"500 g",price:70},
{unit:"1 kg",price:130}
]
},

{
id:21,
name:"Tissue Paper",
tigrinya:"ቲሹ",
category:"home",
image:"images/tissue.jpg",
brand:"Soft",
options:[
{unit:"Single Pack",price:30},
{unit:"Large Pack",price:100}
]
},

{
id:22,
name:"Toothpaste",
tigrinya:"ስኒ ሳምና",
category:"home",
image:"images/toothpaste.jpg",
brand:"Colgate",
options:[
{unit:"Small",price:40},
{unit:"Large",price:90}
]
},

{
id:23,
name:"Shampoo",
tigrinya:"ሻምፖ",
category:"home",
image:"images/shampoo.jpg",
brand:"Clear",
options:[
{unit:"Small",price:80},
{unit:"Large",price:160}
]
}
];
// Initialize product database (only once)

if(!localStorage.getItem("yoasProducts")){

    localStorage.setItem(
        "yoasProducts",
        JSON.stringify(products)
    );

}