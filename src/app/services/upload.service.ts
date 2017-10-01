import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Upload } from '../shared/upload';


@Injectable()
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private uploadTask: firebase.storage.UploadTask;
  uploads: FirebaseListObservable<Upload[]>;

  pushUpload(key:string, upload: Upload) {
    console.log('from inside pushupload upload: ', upload, 'key: ', key);
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`/uploads/${upload.file.name}`).put(upload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log(upload.progress);
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL
        upload.name = upload.file.name
        this.saveFileData(key, upload)
        this.db.object(`/users/${key}/`).update({ imageUrl: upload.url })
      }
    )
  }
  // Writes the file details to the realtime db
  private saveFileData(key:string, upload: Upload) {
    this.db.list(`/uploads/`).update(key, upload);
  }


  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
    .then( () => {
      this.deleteFileStorage(upload.name)
    })
    .catch(error => console.log(error))
  }
  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`/uploads/`).remove(key);
  }
  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`/uploads/${name}`).delete()
  }
}