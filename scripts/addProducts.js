const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBmRH868e6uDiSyA7I_eQ3EVvUsbGxY8vw",
  authDomain: "machina-2dd5b.firebaseapp.com",
  projectId: "machina-2dd5b",
  storageBucket: "machina-2dd5b.firebasestorage.app",
  messagingSenderId: "1095779693158",
  appId: "1:1095779693158:web:06ce99c3e6508b5ec633a7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productos = [
  {
    nombre: "Excavadora CAT 320",
    categoria: "Excavadoras",
    precio: "$4,500/día",
    imagen: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2532&auto=format&fit=crop",
    tag: "Popular",
    status: "Disponible",
    descripcion: "Excavadora hidráulica de 20 toneladas con tecnología avanzada.",
    especificacion: "Peso: 20t | Motor: 121 HP | Profundidad excavación: 6.7m"
  },
  {
    nombre: "Retroexcavadora 420F",
    categoria: "Retroexcavadoras",
    precio: "$3,200/día",
    imagen: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2670&auto=format&fit=crop",
    tag: "Oferta",
    status: "Disponible",
    descripcion: "Retroexcavadora versatile ideal para obras urbanas.",
    especificacion: "Profundidad excavación: 4.3m | Capacidad cucharon: 1m³"
  },
  {
    nombre: "Grúa Telescópica 50T",
    categoria: "Grúas",
    precio: "$12,000/día",
    imagen: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2574&auto=format&fit=crop",
    tag: "Nuevo",
    status: "Disponible",
    descripcion: "Grúa de alto rendimiento para proyectos de gran escala.",
    especificacion: "Capacidad: 50 toneladas | Alcance: 42m"
  },
  {
    nombre: "Bulldozer D6T",
    categoria: "Bulldozers",
    precio: "$5,500/día",
    imagen: "https://images.unsplash.com/photo-1519003300449-424ad0405076?q=80&w=2000&auto=format&fit=crop",
    tag: null,
    status: "Mantenimiento",
    descripcion: "Bulldozer de alta potencia para movimiento de tierra.",
    especificacion: "Motor: 200 HP | Capacidad hoja: 4.5m³"
  },
  {
    nombre: "Rodillo Compactador",
    categoria: "Compactación",
    precio: "$2,800/día",
    imagen: "https://images.unsplash.com/photo-1627836873536-e0f0559f3438?q=80&w=2670&auto=format&fit=crop",
    tag: null,
    status: "Disponible",
    descripcion: "Rodillo vibratorio para compactación de suelo.",
    especificacion: "Peso: 10 toneladas | Ancho rodillo: 2.1m"
  },
  {
    nombre: "Cargador Frontal 950",
    categoria: "Cargadores",
    precio: "$4,100/día",
    imagen: "https://images.unsplash.com/photo-1579623261984-41f9a81d2b16?q=80&w=2670&auto=format&fit=crop",
    tag: "Recomendado",
    status: "Disponible",
    descripcion: "Cargador frontal para manejo de materiales.",
    especificacion: "Capacidad bucket: 3.5m³ | Motor: 230 HP"
  },
  {
    nombre: "Compactador de Neumáticos",
    categoria: "Compactación",
    precio: "$2,500/día",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2670&auto=format&fit=crop",
    tag: null,
    status: "Disponible",
    descripcion: "Compactador de neumáticos para asfalto.",
    especificacion: "7 neumáticos | Presión adjustable"
  },
  {
    nombre: "Mini Excavadora 3T",
    categoria: "Excavadoras",
    precio: "$2,200/día",
    imagen: "https://images.unsplash.com/photo-1581092160563-b73f43d8fe09?q=80&w=2532&auto=format&fit=crop",
    tag: null,
    status: "Disponible",
    descripcion: "Mini excavadora para espacios reducidos.",
    especificacion: "Peso: 3 toneladas | Profundidad: 3.5m"
  },
];

async function agregarProductos() {
  console.log('Agregando productos a Firestore...');
  
  for (const producto of productos) {
    const docRef = await addDoc(collection(db, 'productos'), producto);
    console.log('✅ Agregado:', producto.nombre);
  }
  
  console.log('🎉 Todos los productos agregados correctamente!');
}

agregarProductos().catch(console.error);