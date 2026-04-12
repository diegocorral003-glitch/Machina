import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

// Colecciones
export const COLLECTIONS = {
  PRODUCTS: 'productos',
  CONTACT_MESSAGES: 'mensajes_contacto',
  FAVORITES: 'favoritos',
};

// Productos
export async function getProducts(category?: string) {
  let q = collection(db, COLLECTIONS.PRODUCTS);
  
  if (category && category !== 'Todas') {
    q = query(q, where('categoria', '==', category));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getProductById(id: string) {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

// Mensajes de contacto
export async function sendContactMessage(data: {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
}) {
  const docRef = await addDoc(collection(db, COLLECTIONS.CONTACT_MESSAGES), {
    ...data,
    fecha: serverTimestamp(),
    leido: false,
  });
  return docRef.id;
}

// Favoritos
export async function addFavorite(userId: string, productId: string) {
  const docRef = await addDoc(collection(db, COLLECTIONS.FAVORITES), {
    usuarioId: userId,
    productoId: productId,
    fecha: serverTimestamp(),
  });
  return docRef.id;
}

export async function getFavorites(userId: string) {
  const q = query(
    collection(db, COLLECTIONS.FAVORITES),
    where('usuarioId', '==', userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data().productId);
}