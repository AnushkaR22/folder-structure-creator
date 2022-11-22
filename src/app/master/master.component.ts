import { Component, OnInit } from '@angular/core';
import { NodeModel } from 'src/models/node.model';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {
  // node lists 
  nodeLists: NodeModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Add a root note to the list 
   */
  addRootNodeToList(): void {
    // generating unique id using data time
    // initially the root folder will always have a type 'folder'
    this.nodeLists.push({
      id: new Date().getTime().toString(),
      type: 'folder',
    })
  }

  /**
   * Remove root node from the list
   * @param toRemoveId - id need to be removed.
   */
  removeRootNode(toRemoveId: string): void {
    this.nodeLists = this.nodeLists.filter((node) => node.id !== toRemoveId);
  }
}
