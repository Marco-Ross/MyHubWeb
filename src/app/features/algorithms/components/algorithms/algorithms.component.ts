import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'settings',
  templateUrl: 'algorithms.component.html',
  styleUrls: ['algorithms.component.scss']
})
export class AlgorithmsComponent
{
  constructor(private formBuilder: FormBuilder) { }

  //

  algorithmsFG!: FormGroup;
  algorithms = [];

  ngOnInit()
  {
    this.algorithmsFG = this.formBuilder.group({
      theme: ''
    });
  }

  //////

}