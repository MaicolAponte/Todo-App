import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, getDoc, getDocs, query, where, collectionData, CollectionReference } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class Fire {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private userService = inject(AuthService);

  //Collections
  workTeamsCollection = collection(this.firestore, 'workTeams')


  // Crear grupo
  async crearGrupo(nombreGrupo: string, descripcion: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Usuario no autenticado');

    // obtenemos datos del usuario en colección "Users"
    const userDoc = await this.userService.getUserByEmail(user.email!);

    if (!userDoc) throw new Error('Usuario no encontrado en Users');

    const newGroup = {
      nombreGrupo,
      descripcion,
      participantesD: [
        {
          numDoc: userDoc.numDoc,
          nombre: userDoc.nombreC,
          rol: 'Líder'
        }
      ],
      participantes: [userDoc.numDoc],
      creadoEn: new Date()
    };

    const docRef = await addDoc(this.workTeamsCollection, newGroup);

    // actualizamos el id en el documento
    return docRef.id;
  }

  // Obtener todos los grupos donde el usuario participa
  async getMisGrupos(numDoc: string) {
    const q = query(
      collection(this.firestore, 'workTeams'),
      where('participantes', 'array-contains', numDoc)
    );
    const snap = await getDocs(q);

    const grupos: any[] = [];
    snap.forEach(doc => {
      const data: any = doc.data();

      // Buscar el rol del usuario en este grupo
      const participante = data.participantesD.find((p: any) => p.numDoc === numDoc);
      const miRol = participante ? participante.rol : 'Sin rol';

      grupos.push({
        id: doc.id,
        ...data,
        miRol
      });
    });

    return grupos;
  }

}
