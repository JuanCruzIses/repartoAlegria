import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firebaseConfig, firebaseStorageURL } from '@/src/utils'; 
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

async function helperUploadingImage(file) {
  const infoFile = file[0]
  const infoUser = file[1]

  try {
  const fileName = infoFile.name;
  const storageReference = ref(storage, `my-app/${fileName}`);
  const metadata = {
    contentType: 'image/jpeg',
    auth:{
      token: {
        auth: infoUser.role, 
      }
    }
  };


  const uploadImage = uploadBytesResumable(storageReference, infoFile, metadata);
    return new Promise((resolve, reject) => {
      uploadImage.on(
        'state_changed',
        (snapshot) => {
          // Puedes agregar código para realizar seguimiento del progreso de la carga aquí
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadImage.snapshot.ref);
            resolve(downloadUrl);
          } catch (error) {
            console.error('Error al obtener la URL de descarga:', error);
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error('Error en la función helperUploadingImage:', error);
    throw error;
  }
}

export default helperUploadingImage;
