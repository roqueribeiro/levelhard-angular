import { Component, inject } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { Task } from './task/task';
import {
  TaskDialogResult,
  TaskDialogComponent,
} from './task-dialog/task-dialog.component';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  runTransaction,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent {
  title = 'Kanban';

  constructor(
    private dialog: MatDialog,
    private store: Firestore = inject(Firestore)
  ) {}

  todo = collectionData(collection(this.store, 'todo'), {
    idField: 'id',
  }) as Observable<Task[]>;
  inProgress = collectionData(collection(this.store, 'inProgress'), {
    idField: 'id',
  }) as Observable<Task[]>;
  done = collectionData(collection(this.store, 'done'), {
    idField: 'id',
  }) as Observable<Task[]>;

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '900px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (!result) {
        return;
      }

      addDoc(collection(this.store, 'todo'), result.task);
    });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '900px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        task.id && deleteDoc(doc(this.store, list, task.id));
      } else {
        task.id && updateDoc(doc(this.store, list, task.id), { ...task });
      }
    });
  }

  drop(event: CdkDragDrop<Task[] | null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];

    runTransaction(this.store, (transaction) => {
      const promise = Promise.all([
        transaction.delete(
          doc(this.store, event.previousContainer.id, item.id || '')
        ),
        transaction.set(
          doc(this.store, event.container.id, item.id || ''),
          item
        ),
      ]);
      return promise;
    });

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
