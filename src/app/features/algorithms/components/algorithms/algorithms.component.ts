import { Component, Injector, NgModuleRef, ViewChild, createNgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAlgorithm } from './Interfaces/algorithm.interface';
import { AlgorithmComponentAnchorDirective } from './algorithm-component-anchor.directive';
import { algorithmCategories } from './algorithms.constant';
import { ViewportScroller } from '@angular/common';
import { ScriptAndStyleLoader } from 'src/app/global-shared/services/script-and-style-loader/script-and-style-loader.service';
import { ScriptConstants } from 'src/app/global-shared/constants/script-store.constant';
import { StyleConstants } from 'src/app/global-shared/constants/style-store.constant';

@Component({
    selector: 'algorithms',
    templateUrl: 'algorithms.component.html',
    styleUrls: ['algorithms.component.scss']
})
export class AlgorithmsComponent
{
    constructor(private formBuilder: FormBuilder, private injector: Injector, private scroll: ViewportScroller, private scriptAndStyleLoader: ScriptAndStyleLoader) { }

    //

    @ViewChild(AlgorithmComponentAnchorDirective, { static: true }) algorithmComponentAnchor!: AlgorithmComponentAnchorDirective;

    algorithmsFG!: FormGroup;
    selected: string = '';
    algorithmCategories = algorithmCategories;

    ngOnInit()
    {
        this.algorithmsFG = this.formBuilder.group({});

        this.scriptAndStyleLoader.loadStyle(StyleConstants.Prism).then(() =>
        {
            this.scriptAndStyleLoader.loadScript(ScriptConstants.Prism).then(() =>
            {
                this.onAlgorithmSelect(this.algorithmCategories[0].algorithms[0]);
            }, () => { });
        }, () => { });
    }

    //////

    onAlgorithmSelect(algorithm: IAlgorithm)
    {
        if (this.selected === algorithm.id || !algorithm.component || !algorithm.module)
            return;

        this.selected = algorithm.id;
        this.loadComponent(algorithm);
        this.scroll.scrollToPosition([0, 0]);
    }

    loadComponent(algorithm: IAlgorithm)
    {
        const viewContainerRef = this.algorithmComponentAnchor.viewContainerRef;
        viewContainerRef.clear();

        const moduleRef: NgModuleRef<typeof algorithm.module> = createNgModule(algorithm.module, this.injector);

        viewContainerRef.createComponent<typeof algorithm.component>(algorithm.component, { ngModuleRef: moduleRef });
    }
}