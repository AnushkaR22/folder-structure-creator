import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NodeModel } from 'src/models/node.model';

@Component({
  selector: 'app-node-item',
  templateUrl: './node-item.component.html',
  styleUrls: ['./node-item.component.scss']
})
export class NodeItemComponent implements OnInit {

  // to receive each node item from parent
  @Input() nodeItem!: NodeModel;

  // emit event to delete item
  @Output() deleteNodeEvent: EventEmitter<any> = new EventEmitter();

  // name input reference 
  @ViewChild('nameInput')
  nameInput!: ElementRef<HTMLInputElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.nameInput && this.nameInput.nativeElement) {
      this.nameInput.nativeElement.focus();
    }
  }

  /**
   * Add child node.
   */
  addChildNodes(): void {
    if (!this.nodeItem.children) {
      this.nodeItem.children = [];
    }
    this.nodeItem.children.push({
      id: new Date().getTime().toString(),
      type: 'unset'
    })
  }

 /**
  * Select node type which need to be created as new node.
  * @param nodeType - type of node selected.
  */
  selectTheNodetype(nodeType: "unset" | "folder" | "file" | null): void {
    this.nodeItem.type = nodeType;
    setTimeout(() => {
      if (this.nameInput && this.nameInput.nativeElement) {
        this.nameInput.nativeElement.focus();
      }
    }, 200);
  }
  /**
   * Updating node name.
   * @param name - name value entered in input.
   */
  updateNodeWithName(name: string): void {
    if (name?.trim()) {
      this.nodeItem.name = name.trim();
    }
  }

  /**
   * Trigger an event to the parent to delete the node.
   */
  deleteNode(): void {
    this.deleteNodeEvent.emit(this.nodeItem.id);
  }

  /**
   * Delete child node.
   * @param toDeleteId - child id to delete
   */
  deleteChildNode(toDeleteId: string): void {
    if (!this.nodeItem.children) {
      this.nodeItem.children = [];
    }
    this.nodeItem.children = this.nodeItem.children.filter((child) => child.id !== toDeleteId);
  }
}
