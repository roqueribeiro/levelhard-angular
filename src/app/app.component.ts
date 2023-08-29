import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ColorSchemeService } from './services/color-scheme.service';

import { Task } from './components/task/task';
import {
  TaskDialogResult,
  TaskDialogComponent,
} from './components/task-dialog/task-dialog.component';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LEVELHARD';

  constructor(
    private dialog: MatDialog,
    private store: Firestore = inject(Firestore),
    public colorSchemeService: ColorSchemeService
  ) {
    this.colorSchemeService.load();
  }

  todo = collectionData(collection(this.store, 'todo'), {
    idField: 'id',
  }) as Observable<Task[]>;
  inProgress = collectionData(collection(this.store, 'inProgress'), {
    idField: 'id',
  }) as Observable<Task[]>;
  done = collectionData(collection(this.store, 'done'), {
    idField: 'id',
  }) as Observable<Task[]>;

  toggleControl = new FormControl(false);

  ngOnInit(): void {
    const currentTheme = this.colorSchemeService.currentActive();
    this.toggleControl.setValue(currentTheme === 'dark');
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      if (darkMode) {
        this.colorSchemeService.update('dark');
      } else {
        this.colorSchemeService.update('light');
      }
    });
  }

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
