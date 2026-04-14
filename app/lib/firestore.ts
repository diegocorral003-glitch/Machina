import { db } from './firebase';
import { storage } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs,
  getDoc,
  doc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  setDoc,
  DocumentData,
  CollectionReference
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Tipos
export interface UserProfile {
  id: string;
  userId: string;
  nombre: string;
  email: string;
  telefono?: string;
  role: string;
  createdAt?: any;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  marca?: string;
  modelo?: string;
  disponibilidad?: string;
  createdAt?: any;
}

export interface Category {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  imagenDestacada?: string;
  destacada?: boolean;
  createdAt?: any;
}

// Colecciones
export const COLLECTIONS = {
  PRODUCTS: 'productos',
  CATEGORIES: 'categorias',
  CONTACT_MESSAGES: 'mensajes_contacto',
  FAVORITES: 'favoritos',
  USERS: 'usuarios',
  CONFIG: 'config',
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

// Mensajes de contacto - Admin
export async function getContactMessages() {
  const q = query(
    collection(db, COLLECTIONS.CONTACT_MESSAGES),
    orderBy('fecha', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function markMessageAsRead(messageId: string) {
  const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, messageId);
  await updateDoc(docRef, { leido: true });
}

export async function deleteContactMessage(messageId: string) {
  const docRef = doc(db, COLLECTIONS.CONTACT_MESSAGES, messageId);
  await deleteDoc(docRef);
}

// CRUD Productos - Admin
export async function createProduct(data: {
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  marca?: string;
  modelo?: string;
  disponibilidad?: string;
}) {
  const docRef = await addDoc(collection(db, COLLECTIONS.PRODUCTS), {
    ...data,
    createdAt: serverTimestamp(),
    disponibilidad: data.disponibilidad || 'disponible',
  });
  return docRef.id;
}

export async function updateProduct(id: string, data: {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  categoria?: string;
  imagen?: string;
  marca?: string;
  modelo?: string;
  disponibilidad?: string;
}) {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(id: string) {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
  await deleteDoc(docRef);
}

// Subir imagen a Firebase Storage
export async function uploadProductImage(file: File): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name.replace(/\s/g, '_')}`;
  const storageRef = ref(storage, `productos/${fileName}`);
  
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  
  return downloadURL;
}

// Usuarios
export async function createUserProfile(userId: string, data: {
  nombre: string;
  email: string;
  telefono?: string;
  role?: string;
}) {
  // Usar setDoc para que si ya existe el documento, lo sobrescriba en lugar de crear otro
  await setDoc(doc(db, COLLECTIONS.USERS, userId), {
    ...data,
    userId,
    role: data.role || 'usuario',
    createdAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserProfile(userId: string) {
  const usersRef = collection(db, COLLECTIONS.USERS) as CollectionReference<DocumentData>;
  const q = query(usersRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function updateUserProfile(userId: string, data: { nombre?: string; telefono?: string }) {
  const usersRef = collection(db, COLLECTIONS.USERS) as CollectionReference<DocumentData>;
  const q = query(usersRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return;
  const userDoc = snapshot.docs[0];
  await updateDoc(doc(db, COLLECTIONS.USERS, userDoc.id), data);
}

export async function updateUserRole(userId: string, role: string) {
  const usersRef = collection(db, COLLECTIONS.USERS) as CollectionReference<DocumentData>;
  const q = query(usersRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return;
  const userDoc = snapshot.docs[0];
  await updateDoc(doc(db, COLLECTIONS.USERS, userDoc.id), { role });
}

export async function getAllUsers() {
  const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteUser(userId: string) {
  const usersRef = collection(db, COLLECTIONS.USERS) as CollectionReference<DocumentData>;
  const q = query(usersRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return;
  const userDoc = snapshot.docs[0];
  await deleteDoc(doc(db, COLLECTIONS.USERS, userDoc.id));
}

// Configuración del sitio
export async function getConfig() {
  const snapshot = await getDocs(collection(db, COLLECTIONS.CONFIG));
  if (snapshot.empty) return null;
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
}

export async function updateConfig(data: {
  nombreEmpresa?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  horario?: string;
  mensajeBienvenida?: string;
}) {
  const snapshot = await getDocs(collection(db, COLLECTIONS.CONFIG));
  if (snapshot.empty) {
    await addDoc(collection(db, COLLECTIONS.CONFIG), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } else {
    const configDoc = snapshot.docs[0];
    await updateDoc(doc(db, COLLECTIONS.CONFIG, configDoc.id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  }
}

// Categorías
export async function getCategories() {
  const categoriesRef = collection(db, COLLECTIONS.CATEGORIES) as CollectionReference<DocumentData>;
  const q = query(categoriesRef, orderBy('nombre', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getCategoryById(id: string) {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

export async function createCategory(data: {
  nombre: string;
  slug: string;
  descripcion?: string;
  imagenDestacada?: string;
  destacada?: boolean;
}) {
  const docRef = await addDoc(collection(db, COLLECTIONS.CATEGORIES), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCategory(id: string, data: {
  nombre?: string;
  slug?: string;
  descripcion?: string;
  imagenDestacada?: string;
  destacada?: boolean;
}) {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCategory(id: string) {
  const docRef = doc(db, COLLECTIONS.CATEGORIES, id);
  await deleteDoc(docRef);
}