import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorModule } from '@tinymce/tinymce-angular';

import { SharedModule } from '../../shared/shared.module';
import { KanbanRoutingModule } from './kanban-routing.module';

import { KanbanComponent } from './pages/kanban.component';
import { TaskComponent } from './pages/task/task.component';
import { TaskDialogComponent } from './pages/task-dialog/task-dialog.component';

@NgModule({
  declarations: [KanbanComponent, TaskComponent, TaskDialogComponent],
  exports: [],
  imports: [KanbanRoutingModule, SharedModule, DragDropModule, EditorModule],
})
export class KanbanModule {}
